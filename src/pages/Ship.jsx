import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isShipUnlocked, getChecklistProgress } from '../utils/testChecklist'
import { Rocket, Lock, CheckCircle2, AlertTriangle } from 'lucide-react'

function Ship() {
  const navigate = useNavigate()
  const [unlocked, setUnlocked] = useState(false)
  const [progress, setProgress] = useState({ passed: 0, total: 10 })

  useEffect(() => {
    const shipUnlocked = isShipUnlocked()
    setUnlocked(shipUnlocked)
    setProgress(getChecklistProgress())

    if (!shipUnlocked) {
      // Redirect to test checklist after 3 seconds
      const timer = setTimeout(() => {
        navigate('/prp/07-test')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [navigate])

  if (!unlocked) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ship Page Locked</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Complete all test checklist items before shipping to production.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 mb-2">
                  Tests Passed: {progress.passed} / {progress.total}
                </p>
                <p className="text-sm text-yellow-700">
                  You need to pass all {progress.total} tests to unlock this page.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Redirecting to test checklist in 3 seconds...
          </p>

          <button
            onClick={() => navigate('/prp/07-test')}
            className="bg-primary hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go to Test Checklist
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-12 rounded-lg shadow-lg text-center border-2 border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Rocket className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to Ship! 🚀</h1>
        
        <p className="text-xl text-gray-700 mb-8">
          All tests passed. Your Placement Readiness Platform is production-ready.
        </p>

        <div className="bg-white rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {progress.passed} / {progress.total} Tests Passed
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Validation</p>
              <p className="font-semibold text-gray-900">✓ Working</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Skill Extraction</p>
              <p className="font-semibold text-gray-900">✓ Working</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Score Calculation</p>
              <p className="font-semibold text-gray-900">✓ Working</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Persistence</p>
              <p className="font-semibold text-gray-900">✓ Working</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Next Steps:</h3>
          <div className="bg-white rounded-lg p-6 text-left max-w-2xl mx-auto">
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span className="text-gray-700">Build production bundle: <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run build</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span className="text-gray-700">Deploy to hosting platform (Vercel, Netlify, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span className="text-gray-700">Test in production environment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span className="text-gray-700">Share with users and gather feedback</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/prp/07-test')}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-white transition-colors"
          >
            View Test Checklist
          </button>
          <button
            onClick={() => navigate('/app')}
            className="px-6 py-3 bg-primary hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ship
