import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAnalysisById, updateAnalysis } from '../utils/historyManager'
import { copy7DayPlan, copyChecklist, copyQuestions, downloadAsTxt } from '../utils/exportUtils'
import { CheckCircle2, Calendar, Lightbulb, Target, ArrowLeft, Download, Copy, AlertCircle, Building2, TrendingUp, Users } from 'lucide-react'

function Results() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({})
  const [currentScore, setCurrentScore] = useState(0)
  const [copiedItem, setCopiedItem] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        setAnalysis(data)
        setSkillConfidenceMap(data.skillConfidenceMap || {})
        setCurrentScore(data.currentReadinessScore || data.readinessScore)
      } else {
        navigate('/app/practice')
      }
    } else {
      navigate('/app/practice')
    }
  }, [searchParams, navigate])

  useEffect(() => {
    if (analysis) {
      // Calculate live score based on skill confidence
      let score = analysis.readinessScore
      
      Object.values(skillConfidenceMap).forEach(confidence => {
        if (confidence === 'know') {
          score += 2
        } else if (confidence === 'practice') {
          score -= 2
        }
      })
      
      // Bounds: 0-100
      score = Math.max(0, Math.min(100, score))
      setCurrentScore(score)
      
      // Save to history
      if (analysis.id) {
        updateAnalysis(analysis.id, {
          skillConfidenceMap,
          currentReadinessScore: score
        })
      }
    }
  }, [skillConfidenceMap, analysis])

  const toggleSkillConfidence = (skill) => {
    setSkillConfidenceMap(prev => {
      const current = prev[skill] || 'practice'
      return {
        ...prev,
        [skill]: current === 'practice' ? 'know' : 'practice'
      }
    })
  }

  const handleCopy = (type, data) => {
    switch (type) {
      case 'plan':
        copy7DayPlan(data)
        break
      case 'checklist':
        copyChecklist(data)
        break
      case 'questions':
        copyQuestions(data)
        break
    }
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const getWeakSkills = () => {
    const weak = []
    Object.entries(analysis.extractedSkills).forEach(([key, category]) => {
      category.skills.forEach(skill => {
        if (skillConfidenceMap[skill] === 'practice' || !skillConfidenceMap[skill]) {
          weak.push(skill)
        }
      })
    })
    return weak.slice(0, 3)
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading analysis...</div>
      </div>
    )
  }

  const hasSkills = Object.keys(analysis.extractedSkills).length > 0
  const weakSkills = hasSkills ? getWeakSkills() : []

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
            <div className="text-5xl font-bold text-primary mb-1 transition-all duration-300">
              {currentScore}
            </div>
            <div className="text-sm text-gray-600">Readiness Score</div>
            {currentScore !== analysis.readinessScore && (
              <div className="text-xs text-gray-500 mt-1">
                Base: {analysis.readinessScore}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Intel */}
      {analysis.companyIntel && analysis.company && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Intel</h2>
              <p className="text-xs text-gray-500 italic">Demo Mode: Company intel generated heuristically</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Company</h3>
              </div>
              <p className="text-gray-700">{analysis.companyIntel.company}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Industry</h3>
              </div>
              <p className="text-gray-700">{analysis.companyIntel.industry}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Size</h3>
              </div>
              <p className="text-gray-700">{analysis.companyIntel.sizeLabel}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-indigo-200">
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              Typical Hiring Focus: {analysis.companyIntel.hiringFocus.title}
            </h3>
            <ul className="space-y-2">
              {analysis.companyIntel.hiringFocus.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-primary mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Round Mapping */}
      {analysis.companyIntel && analysis.companyIntel.roundMapping && (
        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Interview Round Mapping
          </h2>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {analysis.companyIntel.roundMapping.map((round, idx) => (
                <div key={idx} className="relative pl-16">
                  {/* Round number circle */}
                  <div className="absolute left-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                    {round.round}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {round.title}
                        </h3>
                        <p className="text-sm text-gray-600">{round.description}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-purple-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {round.duration}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-gray-700">Focus: </span>
                      <span className="text-sm text-gray-600">{round.focus}</span>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-blue-900">Why this matters: </span>
                        {round.why}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Extracted Skills with Toggle */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Key Skills Extracted
          </h2>
          <p className="text-sm text-gray-500">Click skills to mark your confidence</p>
        </div>
        {hasSkills ? (
          <div className="space-y-4">
            {Object.entries(analysis.extractedSkills).map(([key, category]) => (
              <div key={key}>
                <h3 className="font-semibold text-gray-700 mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => {
                    const confidence = skillConfidenceMap[skill] || 'practice'
                    const isKnown = confidence === 'know'
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleSkillConfidence(skill)}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          isKnown
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : 'bg-purple-100 text-primary border-2 border-purple-300'
                        }`}
                        title={isKnown ? 'I know this' : 'Need practice'}
                      >
                        {skill}
                        <span className="ml-2 text-xs">
                          {isKnown ? '✓' : '○'}
                        </span>
                      </button>
                    )
                  })}
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Round-wise Preparation Checklist
          </h2>
          <button
            onClick={() => handleCopy('checklist', analysis.checklist)}
            className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copiedItem === 'checklist' ? 'Copied!' : 'Copy'}
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            7-Day Preparation Plan
          </h2>
          <button
            onClick={() => handleCopy('plan', analysis.plan)}
            className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copiedItem === 'plan' ? 'Copied!' : 'Copy'}
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            10 Likely Interview Questions
          </h2>
          <button
            onClick={() => handleCopy('questions', analysis.questions)}
            className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copiedItem === 'questions' ? 'Copied!' : 'Copy'}
          </button>
        </div>
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

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-primary rounded-lg p-8 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Action Next</h3>
              <p className="text-gray-700 mb-3">
                Focus on these skills marked for practice:
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {weakSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-primary text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-lg font-semibold text-primary">
                💡 Start Day 1 plan now.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <button
          onClick={() => downloadAsTxt(analysis)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Complete Analysis as TXT
        </button>
      </div>
    </div>
  )
}

export default Results
