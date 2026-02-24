import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function HLD() {
  const { setPromptText } = useOutletContext()

  const prompt = `Create a resume preview component that shows:
- Live preview of the resume as user types
- Professional template with clean typography
- Sections: Header, Summary, Experience, Education, Skills
- Toggle between different template styles`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 4: High-Level Design</h2>
      <p className="mb-md">
        Design the major modules and their interactions.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Core Modules</h3>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#8B0000' }}>
            1. Form Builder Module
          </h4>
          <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
            Multi-step form with validation, auto-save, and progress tracking. Handles all user input 
            for personal info, experience, education, and skills.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#8B0000' }}>
            2. AI Content Generator
          </h4>
          <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
            Integrates with AI API to generate professional summaries, bullet points, and skill 
            descriptions based on user's role and experience.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#8B0000' }}>
            3. Preview Engine
          </h4>
          <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
            Real-time rendering of resume with selected template. Updates instantly as user edits content.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#8B0000' }}>
            4. Export Module
          </h4>
          <p style={{ lineHeight: '1.7', color: '#5A5A5A' }}>
            Converts resume to PDF format with proper formatting, fonts, and layout preservation.
          </p>
        </div>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Build the live preview component that updates as users type.
        </p>
      </div>
    </div>
  )
}

export default HLD
