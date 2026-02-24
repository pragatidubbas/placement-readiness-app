import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Market() {
  const { setPromptText } = useOutletContext()

  const prompt = `Add a "How It Works" section with 3 steps:
1. Enter Your Details - Simple form for basic info
2. AI Generates Content - Smart suggestions for each section
3. Download & Apply - Export as PDF

Use icons and a clean step-by-step layout.`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 2: Market Research</h2>
      <p className="mb-md">
        Understand the competitive landscape and identify your unique value proposition.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Competitors</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li><strong>Resume.io:</strong> Template-based, limited AI features</li>
          <li><strong>Zety:</strong> Good templates, but expensive subscription</li>
          <li><strong>Canva:</strong> Design-focused, not ATS-optimized</li>
          <li><strong>LinkedIn Resume Builder:</strong> Basic, lacks customization</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Our Differentiation</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>AI-powered content generation (not just templates)</li>
          <li>Real-time ATS compatibility scoring</li>
          <li>Industry-specific optimization</li>
          <li>Free tier with core features</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Market Size</h3>
        <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
          The global resume writing services market is growing rapidly. With millions of job seekers 
          worldwide and increasing adoption of ATS systems, there's strong demand for tools that help 
          candidates stand out while meeting technical requirements.
        </p>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Build the "How It Works" section to show users the simple 3-step process.
        </p>
      </div>
    </div>
  )
}

export default Market
