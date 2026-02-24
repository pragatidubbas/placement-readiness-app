import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { STEPS, getProgress, getArtifact, saveArtifact, markStepComplete, canProceedToNext } from '../utils/resumeBuilderProgress'
import { Copy, ExternalLink, CheckCircle2, XCircle, Camera, ChevronRight } from 'lucide-react'

function ResumeBuilderLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [progress, setProgress] = useState({ currentStep: 1, completedSteps: [], status: 'not-started' })
  const [currentStepData, setCurrentStepData] = useState(null)
  const [promptText, setPromptText] = useState('')
  const [artifact, setArtifact] = useState(null)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  // Find current step from path
  const currentStep = STEPS.find(step => location.pathname.startsWith(step.path))
  const currentStepId = currentStep?.id || 1

  useEffect(() => {
    loadProgress()
    loadArtifact()
  }, [currentStepId])

  const loadProgress = () => {
    setProgress(getProgress())
  }

  const loadArtifact = () => {
    const art = getArtifact(currentStepId)
    setArtifact(art)
  }

  const handleCopyPrompt = () => {
    if (promptText) {
      navigator.clipboard.writeText(promptText)
      setCopiedPrompt(true)
      setTimeout(() => setCopiedPrompt(false), 2000)
    }
  }

  const handleItWorked = () => {
    if (!artifact) {
      alert('Please upload a screenshot first')
      return
    }
    
    markStepComplete(currentStepId)
    loadProgress()
    
    // Navigate to next step if available
    if (currentStepId < 8) {
      const nextStep = STEPS.find(s => s.id === currentStepId + 1)
      if (nextStep) {
        navigate(nextStep.path)
      }
    } else {
      navigate('/rb/proof')
    }
  }

  const handleError = () => {
    alert('Please review the error and try again. Check the prompt or adjust your approach.')
  }

  const handleAddScreenshot = () => {
    const screenshotUrl = prompt('Enter screenshot URL or description:')
    if (screenshotUrl) {
      saveArtifact(currentStepId, {
        type: 'screenshot',
        url: screenshotUrl,
        description: `Step ${currentStepId} artifact`
      })
      loadArtifact()
    }
  }

  const getStatusBadge = () => {
    if (progress.status === 'shipped') return 'Shipped'
    if (progress.status === 'in-progress') return 'In Progress'
    return 'Not Started'
  }

  const getStatusColor = () => {
    if (progress.status === 'shipped') return 'bg-green-100 text-green-800 border-green-500'
    if (progress.status === 'in-progress') return 'bg-yellow-100 text-yellow-800 border-yellow-500'
    return 'bg-gray-100 text-gray-800 border-gray-500'
  }

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="project-name">AI Resume Builder</div>
        <div className="progress-indicator">
          Project 3 — Step {currentStepId} of 8
        </div>
        <div className={`status-badge ${getStatusColor()}`}>
          {getStatusBadge()}
        </div>
      </header>

      {/* Context Header */}
      <section className="context-header">
        <h1>{currentStep?.title || 'AI Resume Builder'}</h1>
        <p className="subtext">
          {currentStep?.label || 'Build Track'} — Follow the structured process to ship your project
        </p>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Primary Workspace (70%) */}
        <div className="primary-workspace">
          <Outlet context={{ setPromptText, currentStepId }} />
        </div>

        {/* Secondary Build Panel (30%) */}
        <aside className="secondary-panel">
          <div className="step-explanation mb-md">
            <h3 className="step-title">Build Panel</h3>
            <p className="step-description">
              Copy the prompt, build in Lovable, and mark complete when done.
            </p>
          </div>

          {/* Prompt Box */}
          {promptText && (
            <div className="prompt-box mb-sm">
              <div className="prompt-box-header">
                <span className="prompt-label">Copy This Into Lovable</span>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: '13px' }}>
                {promptText}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="btn-group" style={{ flexDirection: 'column', gap: '8px' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleCopyPrompt}
              disabled={!promptText}
            >
              <Copy style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {copiedPrompt ? 'Copied!' : 'Copy Prompt'}
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => window.open('https://lovable.dev', '_blank')}
            >
              <ExternalLink style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Build in Lovable
            </button>

            <button 
              className="btn btn-primary"
              onClick={handleItWorked}
              disabled={!artifact}
            >
              <CheckCircle2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              It Worked
            </button>

            <button 
              className="btn btn-secondary"
              onClick={handleError}
            >
              <XCircle style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Report Error
            </button>

            <button 
              className="btn btn-secondary"
              onClick={handleAddScreenshot}
            >
              <Camera style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Add Screenshot
            </button>
          </div>

          {/* Artifact Status */}
          {artifact && (
            <div className="mt-md" style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '4px' }}>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                ✓ Artifact uploaded
              </p>
            </div>
          )}

          {/* Next Step Hint */}
          {canProceedToNext(currentStepId) && currentStepId < 8 && (
            <div className="mt-md" style={{ padding: '12px', background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '4px' }}>
              <p style={{ fontSize: '13px', color: '#1e40af', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Ready for next step
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </p>
            </div>
          )}
        </aside>
      </main>

      {/* Proof Footer */}
      <footer className="proof-footer">
        <ul className="proof-checklist">
          {STEPS.map(step => (
            <li key={step.id} className="proof-item">
              <div 
                className={`proof-checkbox ${progress.completedSteps.includes(step.id) ? 'checked' : ''}`}
              ></div>
              <span>{step.label}</span>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}

export default ResumeBuilderLayout
