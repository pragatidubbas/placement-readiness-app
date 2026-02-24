import { useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { Rocket } from 'lucide-react'

function RBShip() {
  const { setPromptText } = useOutletContext()
  const navigate = useNavigate()

  const prompt = `Final deployment checklist:
- Build production bundle
- Test in production mode
- Deploy to hosting platform
- Verify all features work in production
- Share with users for feedback`

  useEffect(() => {
    setPromptText(prompt)
  }, [setPromptText])

  return (
    <div className="card">
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: '#8B0000', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <Rocket style={{ width: '40px', height: '40px', color: 'white' }} />
        </div>
        
        <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
          Ready to Ship!
        </h2>
        <p style={{ fontSize: '18px', color: '#5A5A5A', marginBottom: '32px' }}>
          Your AI Resume Builder is complete and ready for production.
        </p>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Pre-Ship Checklist</h3>
        <ul style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>✓ All features implemented and tested</li>
          <li>✓ Mobile responsive design verified</li>
          <li>✓ PDF export working correctly</li>
          <li>✓ AI integration functional</li>
          <li>✓ No console errors or warnings</li>
          <li>✓ Performance optimized</li>
          <li>✓ SEO meta tags added</li>
          <li>✓ Analytics tracking configured</li>
        </ul>
      </div>

      <div className="mb-lg">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Deployment Steps</h3>
        <ol style={{ lineHeight: '1.8', color: '#5A5A5A', paddingLeft: '24px' }}>
          <li>Run production build: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>npm run build</code></li>
          <li>Test production bundle locally</li>
          <li>Deploy to Vercel/Netlify</li>
          <li>Configure custom domain (optional)</li>
          <li>Set up environment variables</li>
          <li>Monitor for errors in production</li>
        </ol>
      </div>

      <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '4px', border: '2px solid #86efac', marginBottom: '24px' }}>
        <p style={{ fontSize: '16px', color: '#166534', margin: 0, fontWeight: '600' }}>
          🎉 Congratulations! You've completed the Build Track.
        </p>
        <p style={{ fontSize: '14px', color: '#166534', marginTop: '8px', margin: 0 }}>
          Head to the Proof page to submit your final deliverables.
        </p>
      </div>

      <button
        onClick={() => navigate('/rb/proof')}
        style={{
          width: '100%',
          padding: '16px',
          background: '#8B0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = '#6D0000'}
        onMouseOut={(e) => e.target.style.background = '#8B0000'}
      >
        Go to Proof Page →
      </button>
    </div>
  )
}

export default RBShip
