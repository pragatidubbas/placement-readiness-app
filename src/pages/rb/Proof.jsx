import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { STEPS, getProgress, getProofData, saveProofData } from '../../utils/resumeBuilderProgress'
import { CheckCircle2, Circle, Copy, ExternalLink } from 'lucide-react'

function Proof() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState({ completedSteps: [] })
  const [proofData, setProofData] = useState({
    lovableLink: '',
    githubLink: '',
    deployLink: ''
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setProgress(getProgress())
    setProofData(getProofData())
  }, [])

  const handleInputChange = (field, value) => {
    const newData = { ...proofData, [field]: value }
    setProofData(newData)
    saveProofData(newData)
  }

  const handleCopySubmission = () => {
    const submission = `AI Resume Builder - Project 3 Submission

Lovable Link: ${proofData.lovableLink || 'Not provided'}
GitHub Link: ${proofData.githubLink || 'Not provided'}
Deploy Link: ${proofData.deployLink || 'Not provided'}

Completed Steps: ${progress.completedSteps.length} / 8

Step Status:
${STEPS.map(step => 
  `${progress.completedSteps.includes(step.id) ? '✓' : '□'} ${step.label}`
).join('\n')}

Generated on: ${new Date().toLocaleString()}
`
    
    navigator.clipboard.writeText(submission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allStepsComplete = progress.completedSteps.length === 8
  const hasAllLinks = proofData.lovableLink && proofData.githubLink && proofData.deployLink

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '8px' }}>
          Proof of Completion
        </h1>
        <p style={{ fontSize: '18px', color: '#5A5A5A' }}>
          Submit your final deliverables for AI Resume Builder
        </p>
      </div>

      {/* Step Status */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="card-title">Build Track Progress</h2>
        <p style={{ marginBottom: '24px', color: '#5A5A5A' }}>
          {progress.completedSteps.length} of 8 steps completed
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {STEPS.map(step => {
            const isComplete = progress.completedSteps.includes(step.id)
            return (
              <div 
                key={step.id}
                style={{
                  padding: '16px',
                  border: `2px solid ${isComplete ? '#86efac' : '#D4D2CC'}`,
                  borderRadius: '8px',
                  background: isComplete ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(step.path)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {isComplete ? (
                    <CheckCircle2 style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                  ) : (
                    <Circle style={{ width: '20px', height: '20px', color: '#9CA3AF' }} />
                  )}
                  <span style={{ fontSize: '14px', fontWeight: '600', color: isComplete ? '#16a34a' : '#5A5A5A' }}>
                    Step {step.id}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>

        {!allStepsComplete && (
          <div style={{ marginTop: '24px', padding: '16px', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', color: '#92400e', margin: 0 }}>
              ⚠️ Complete all 8 steps before submitting final proof
            </p>
          </div>
        )}
      </div>

      {/* Submission Links */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="card-title">Submission Links</h2>
        <p style={{ marginBottom: '24px', color: '#5A5A5A' }}>
          Provide links to your completed project
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Lovable Project Link <span style={{ color: '#8B0000' }}>*</span>
            </label>
            <input
              type="url"
              value={proofData.lovableLink}
              onChange={(e) => handleInputChange('lovableLink', e.target.value)}
              placeholder="https://lovable.dev/projects/..."
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              GitHub Repository Link <span style={{ color: '#8B0000' }}>*</span>
            </label>
            <input
              type="url"
              value={proofData.githubLink}
              onChange={(e) => handleInputChange('githubLink', e.target.value)}
              placeholder="https://github.com/username/repo"
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Deployed Application Link <span style={{ color: '#8B0000' }}>*</span>
            </label>
            <input
              type="url"
              value={proofData.deployLink}
              onChange={(e) => handleInputChange('deployLink', e.target.value)}
              placeholder="https://your-app.vercel.app"
              className="input"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Preview Links */}
        {(proofData.lovableLink || proofData.githubLink || proofData.deployLink) && (
          <div style={{ marginTop: '24px', padding: '16px', background: '#F7F6F3', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Quick Access:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {proofData.lovableLink && (
                <a 
                  href={proofData.lovableLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B0000', fontSize: '14px', textDecoration: 'none' }}
                >
                  <ExternalLink style={{ width: '14px', height: '14px' }} />
                  Open in Lovable
                </a>
              )}
              {proofData.githubLink && (
                <a 
                  href={proofData.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B0000', fontSize: '14px', textDecoration: 'none' }}
                >
                  <ExternalLink style={{ width: '14px', height: '14px' }} />
                  View on GitHub
                </a>
              )}
              {proofData.deployLink && (
                <a 
                  href={proofData.deployLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B0000', fontSize: '14px', textDecoration: 'none' }}
                >
                  <ExternalLink style={{ width: '14px', height: '14px' }} />
                  View Live App
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Copy Submission */}
      <div className="card">
        <h2 className="card-title">Final Submission</h2>
        <p style={{ marginBottom: '24px', color: '#5A5A5A' }}>
          Copy your complete submission for review
        </p>

        {allStepsComplete && hasAllLinks ? (
          <div>
            <button
              onClick={handleCopySubmission}
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Copy style={{ width: '18px', height: '18px' }} />
              {copied ? 'Copied to Clipboard!' : 'Copy Final Submission'}
            </button>
            <p style={{ fontSize: '13px', color: '#5A5A5A', marginTop: '12px', textAlign: 'center' }}>
              This will copy all your links and completion status
            </p>
          </div>
        ) : (
          <div style={{ padding: '16px', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', color: '#92400e', margin: 0 }}>
              {!allStepsComplete && '⚠️ Complete all 8 steps first'}
              {allStepsComplete && !hasAllLinks && '⚠️ Fill in all three links above'}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate('/rb/08-ship')}
          className="btn btn-secondary"
        >
          ← Back to Ship
        </button>
        
        {allStepsComplete && hasAllLinks && (
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  )
}

export default Proof
