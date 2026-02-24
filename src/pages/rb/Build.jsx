import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Build() {
  const { setPromptText } = useOutletContext()

  const prompt = `Add PDF export functionality:
- "Download PDF" button
- Generate PDF from resume data
- Include all sections with proper formatting
- Use professional fonts and spacing
- Ensure ATS-friendly layout`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 6: Build Implementation</h2>
      <p className="mb-md">
        Implement the core features and integrate all components.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Implementation Checklist</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>✓ Landing page with hero and features</li>
          <li>✓ Multi-step form for data input</li>
          <li>✓ Live preview with template selection</li>
          <li>✓ AI content generation integration</li>
          <li>→ PDF export functionality (current step)</li>
          <li>□ ATS compatibility checker</li>
          <li>□ Draft auto-save feature</li>
          <li>□ Responsive design for mobile</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Technical Stack</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li><strong>Framework:</strong> React 18 with TypeScript</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>State:</strong> React Context + useReducer</li>
          <li><strong>PDF:</strong> jsPDF or react-pdf</li>
          <li><strong>AI:</strong> OpenAI API (GPT-4)</li>
          <li><strong>Storage:</strong> localStorage for drafts</li>
        </ul>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Add PDF export so users can download their completed resume.
        </p>
      </div>
    </div>
  )
}

export default Build
