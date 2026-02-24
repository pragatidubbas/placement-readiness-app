import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Architecture() {
  const { setPromptText } = useOutletContext()

  const prompt = `Create a resume builder form with sections:
- Personal Info (name, email, phone, location)
- Professional Summary (textarea with AI suggestion button)
- Work Experience (add multiple entries)
- Education
- Skills (tags input)

Use a clean form layout with proper spacing.`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 3: Architecture Design</h2>
      <p className="mb-md">
        Define the high-level system architecture and technology stack.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>System Components</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li><strong>Frontend:</strong> React + Tailwind CSS for responsive UI</li>
          <li><strong>State Management:</strong> React Context for form data</li>
          <li><strong>AI Integration:</strong> OpenAI API for content generation</li>
          <li><strong>PDF Generation:</strong> jsPDF or react-pdf for exports</li>
          <li><strong>Storage:</strong> localStorage for draft saving</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Data Flow</h3>
        <ol style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>User enters basic information in form</li>
          <li>AI analyzes input and generates suggestions</li>
          <li>User reviews and edits AI-generated content</li>
          <li>System validates ATS compatibility</li>
          <li>User selects template and exports PDF</li>
        </ol>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Key Features</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>Multi-step form with progress indicator</li>
          <li>Real-time preview of resume</li>
          <li>AI-powered content suggestions</li>
          <li>ATS compatibility checker</li>
          <li>Multiple template options</li>
          <li>PDF export functionality</li>
        </ul>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Build the resume input form with all necessary sections.
        </p>
      </div>
    </div>
  )
}

export default Architecture
