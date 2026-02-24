import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAnalysisById } from '../utils/historyManager'
import { CheckCircle2, Calendar, Lightbulb, Target, ArrowLeft } from 'lucide-react'

function Results() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        setAnalysis(data)
      } else {
        navigate('/app/practice')
      }
    } else {
      navigate('/app/practice')
    }
  }, [searchParams, navigate])

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading analysis...</div>
      </div>
    )
  }

  const hasSkills = Object.keys(analysis.extractedSkills).length > 0

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/app/assessments')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to History
      </button>

      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {analysis.company || 'Company'} - {analysis.role || 'Role'}
            </h1>
            <p className="text-gray-500">
              Analyzed on {new Date(analysis.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-1">
              {analysis.readinessScore}
            </div>
            <div className="text-sm text-gray-600">Readiness Score</div>
          </div>
        </div>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Key Skills Extracted
        </h2>
        {hasSkills ? (
          <div className="space-y-4">
            {Object.entries(analysis.extractedSkills).map(([key, category]) => (
              <div key={key}>
                <h3 className="font-semibold text-gray-700 mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No specific skills detected. General fresher preparation recommended.
          </p>
        )}
      </div>

      {/* Round-wise Checklist */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-primary" />
          Round-wise Preparation Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(analysis.checklist).map(([key, round]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">{round.title}</h3>
              <ul className="space-y-2">
                {round.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          7-Day Preparation Plan
        </h2>
        <div className="space-y-4">
          {analysis.plan.map((day) => (
            <div key={day.day} className="border-l-4 border-primary pl-6 py-3">
              <h3 className="font-bold text-gray-900 mb-2">
                Day {day.day}: {day.title}
              </h3>
              <ul className="space-y-1">
                {day.tasks.map((task, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          10 Likely Interview Questions
        </h2>
        <div className="space-y-4">
          {analysis.questions.map((question, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {idx + 1}
                </span>
                <p className="text-gray-800 pt-1">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Results
