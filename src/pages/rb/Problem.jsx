import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Problem() {
  const { setPromptText } = useOutletContext()

  const prompt = `Create an AI Resume Builder landing page with:
- Hero section: "Build Your Perfect Resume with AI"
- 3 feature cards: AI-Powered Writing, ATS Optimization, Multiple Templates
- CTA button: "Start Building"
- Clean, professional design with indigo color scheme`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 1: Problem Definition</h2>
      <p className="mb-md">
        Define the core problem your AI Resume Builder solves and the target audience.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Problem Statement</h3>
        <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
          Job seekers struggle to create professional, ATS-friendly resumes that stand out. 
          They lack design skills, don't know what content to include, and waste hours formatting. 
          Our AI Resume Builder solves this by generating tailored, professional resumes in minutes.
        </p>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Target Audience</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>Fresh graduates entering the job market</li>
          <li>Career changers needing to reposition their experience</li>
          <li>Professionals updating their resumes for new opportunities</li>
          <li>Anyone who wants a polished, ATS-optimized resume quickly</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Success Criteria</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>Users can generate a complete resume in under 5 minutes</li>
          <li>AI suggestions improve resume quality measurably</li>
          <li>Resumes pass ATS screening tests</li>
          <li>Users report increased interview callbacks</li>
        </ul>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Copy the prompt from the build panel, create the landing page in Lovable, 
          then upload a screenshot and mark "It Worked" to proceed.
        </p>
      </div>
    </div>
  )
}

export default Problem
