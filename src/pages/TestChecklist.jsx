import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TEST_ITEMS, getChecklist, updateChecklistItem, resetChecklist, getChecklistProgress } from '../utils/testChecklist'
import { CheckCircle2, Circle, AlertTriangle, RotateCcw, Info, Rocket } from 'lucide-react'

function TestChecklist() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState({})
  const [progress, setProgress] = useState({ passed: 0, total: 10, isComplete: false })
  const [expandedHints, setExpandedHints] = useState({})

  useEffect(() => {
    loadChecklist()
  }, [])

  const loadChecklist = () => {
    const data = getChecklist()
    setChecklist(data)
    setProgress(getChecklistProgress())
  }

  const handleToggle = (itemId) => {
    const newChecklist = updateChecklistItem(itemId, !checklist[itemId])
    setChecklist(newChecklist)
    setProgress(getChecklistProgress())
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the test checklist? This will uncheck all items.')) {
      resetChecklist()
      loadChecklist()
    }
  }

  const toggleHint = (itemId) => {
    setExpandedHints(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const progressPercentage = (progress.passed / progress.total) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Checklist</h1>
        <p className="text-gray-600">Verify all features before shipping to production</p>
      </div>

      {/* Progress Summary */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Tests Passed: {progress.passed} / {progress.total}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {progress.isComplete 
                ? '✓ All tests passed! Ready to ship.' 
                : `${progress.total - progress.passed} tests remaining`}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Checklist
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              progress.isComplete ? 'bg-green-500' : 'bg-primary'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Warning */}
        {!progress.isComplete && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800">Fix issues before shipping</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Complete all tests to unlock the ship page and deploy to production.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {progress.isComplete && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-green-800">All tests passed!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your application is ready for production deployment.
                </p>
              </div>
              <button
                onClick={() => navigate('/prp/08-ship')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Rocket className="w-4 h-4" />
                Go to Ship
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test Items */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Test Items</h3>
          <p className="text-sm text-gray-600 mt-1">Click checkboxes as you verify each test</p>
        </div>

        <div className="divide-y divide-gray-200">
          {TEST_ITEMS.map((item, index) => {
            const isChecked = checklist[item.id] || false
            const isHintExpanded = expandedHints[item.id] || false

            return (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    {/* Label */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-sm font-semibold text-gray-500">
                          Test {index + 1}
                        </span>
                        <h4 className={`text-lg font-semibold ${
                          isChecked ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.label}
                        </h4>
                      </div>

                      {/* Hint Toggle */}
                      <button
                        onClick={() => toggleHint(item.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:text-purple-700 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                        {isHintExpanded ? 'Hide' : 'How to test'}
                      </button>
                    </div>

                    {/* Hint */}
                    {isHintExpanded && (
                      <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-sm text-gray-700">{item.hint}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/app')}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {progress.isComplete && (
          <button
            onClick={() => navigate('/prp/08-ship')}
            className="flex items-center gap-2 bg-primary hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Rocket className="w-5 h-5" />
            Proceed to Ship
          </button>
        )}
      </div>
    </div>
  )
}

export default TestChecklist
