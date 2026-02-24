import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory, deleteAnalysis, getCorruptedEntriesCount } from '../utils/historyManager'
import { Trash2, Eye, FileText, AlertTriangle } from 'lucide-react'

function Assessments() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [corruptedCount, setCorruptedCount] = useState(0)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const corrupted = getCorruptedEntriesCount()
    setCorruptedCount(corrupted)
    setHistory(getHistory())
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(id)
      loadHistory()
    }
  }

  const handleView = (id) => {
    navigate(`/app/results?id=${id}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
          <p className="text-gray-600 mt-1">View your past job description analyses</p>
        </div>
        <button
          onClick={() => navigate('/app/practice')}
          className="bg-primary hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          New Analysis
        </button>
      </div>

      {corruptedCount > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-800">
                {corruptedCount} saved {corruptedCount === 1 ? 'entry' : 'entries'} couldn't be loaded.
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Create a new analysis to continue. Corrupted entries have been automatically removed.
              </p>
            </div>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No analyses yet</h3>
          <p className="text-gray-600 mb-6">
            Start by analyzing your first job description to get personalized preparation insights.
          </p>
          <button
            onClick={() => navigate('/app/practice')}
            className="bg-primary hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Analyze Job Description
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {entry.company || 'Unknown Company'}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-semibold">
                      Score: {entry.currentReadinessScore || entry.readinessScore}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    {entry.role || 'Role not specified'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Analyzed on {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  
                  {/* Skills preview */}
                  {Object.keys(entry.extractedSkills).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.entries(entry.extractedSkills).slice(0, 3).map(([key, category]) => (
                        <span
                          key={key}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                        >
                          {category.name}: {category.skills.length} skills
                        </span>
                      ))}
                      {Object.keys(entry.extractedSkills).length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          +{Object.keys(entry.extractedSkills).length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleView(entry.id)}
                    className="p-2 text-primary hover:bg-purple-50 rounded-lg transition-colors"
                    title="View details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Assessments
