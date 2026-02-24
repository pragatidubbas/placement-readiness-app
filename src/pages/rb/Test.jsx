import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Test() {
  const { setPromptText } = useOutletContext()

  const prompt = `Add final polish:
- Improve form validation with error messages
- Add loading states for AI generation
- Ensure mobile responsiveness
- Test PDF export with sample data
- Add success message after download`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <h2 className="card-title">Step 7: Testing & QA</h2>
      <p className="mb-md">
        Verify all features work correctly and fix any issues.
      </p>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Test Checklist</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>□ Form validation works for all required fields</li>
          <li>□ AI generation produces relevant content</li>
          <li>□ Live preview updates correctly</li>
          <li>□ PDF export includes all sections</li>
          <li>□ PDF is ATS-compatible (no images, proper text)</li>
          <li>□ Mobile layout is responsive</li>
          <li>□ Draft auto-save works</li>
          <li>□ No console errors</li>
          <li>□ Loading states show during async operations</li>
          <li>□ Error handling for API failures</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Test Scenarios</h3>
        <ol style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>Create resume from scratch with all sections</li>
          <li>Generate AI content for summary</li>
          <li>Add multiple work experiences</li>
          <li>Switch between templates</li>
          <li>Export to PDF and verify formatting</li>
          <li>Test on mobile device</li>
          <li>Verify draft saves and restores</li>
        </ol>
      </div>

      <div style={{ padding: '16px', background: '#F7F6F3', borderRadius: '4px', border: '1px solid #D4D2CC' }}>
        <p style={{ fontSize: '14px', color: '#5A5A5A', margin: 0 }}>
          <strong>Next Step:</strong> Polish the UI and ensure everything works smoothly before shipping.
        </p>
      </div>
    </div>
  )
}

export default Test
