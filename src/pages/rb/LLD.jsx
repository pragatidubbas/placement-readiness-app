import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function LLD() {
  const { setPromptText } = useOutletContext()

  const prompt = `Add AI suggestion feature:
- "Generate with AI" button for summary section
- Show loading state while generating
- Display AI-generated text in textarea
- Allow user to edit or regenerate
- Use placeholder API for now`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 5: Low-Level Design</h2>
      <p className="mb-md">
        Define detailed component structure and data models.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Data Models</h3>
        
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
          <pre style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, overflow: 'auto' }}>{`interface Resume {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
  }
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  template: 'modern' | 'classic' | 'minimal'
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | 'Present'
  description: string[]
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
}`}</pre>
        </div>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Component Hierarchy</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>ResumeBuilder (main container)</li>
          <li>├── FormSection (left panel)</li>
          <li>│   ├── PersonalInfoForm</li>
          <li>│   ├── SummaryForm (with AI button)</li>
          <li>│   ├── ExperienceForm</li>
          <li>│   ├── EducationForm</li>
          <li>│   └── SkillsForm</li>
          <li>└── PreviewPanel (right panel)</li>
          <li>    └── ResumeTemplate</li>
        </ul>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Implement the AI suggestion feature for the summary section.
        </p>
      </div>
    </div>
  )
}

export default LLD
