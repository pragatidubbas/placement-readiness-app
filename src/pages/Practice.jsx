import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractSkills, calculateReadinessScore, generateChecklist, generate7DayPlan, generateInterviewQuestions } from '../utils/skillExtractor'
import { saveAnalysis } from '../utils/historyManager'
import { generateCompanyIntel } from '../utils/companyIntel'

function Practice() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Extract skills and generate analysis
    const extractedSkills = extractSkills(formData.jdText)
    const readinessScore = calculateReadinessScore(
      formData.jdText,
      formData.company,
      formData.role,
      extractedSkills
    )
    const checklist = generateChecklist(extractedSkills)
    const plan = generate7DayPlan(extractedSkills)
    const questions = generateInterviewQuestions(extractedSkills)
    const companyIntel = generateCompanyIntel(
      formData.company,
      formData.role,
      formData.jdText,
      extractedSkills
    )
    
    // Save to history
    const analysis = saveAnalysis({
      company: formData.company,
      role: formData.role,
      jdText: formData.jdText,
      extractedSkills,
      readinessScore,
      checklist,
      plan,
      questions,
      companyIntel
    })
    
    // Navigate to results with the analysis ID
    navigate(`/app/results?id=${analysis.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">JD Analysis</h2>
      <p className="text-gray-600 mb-8">Paste a job description to get personalized preparation insights.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="e.g., Google, Microsoft, Amazon"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="e.g., Software Engineer, Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.jdText}
            onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
            required
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-y"
            placeholder="Paste the complete job description here..."
          />
          <p className="text-sm text-gray-500 mt-2">
            {formData.jdText.length} characters
          </p>
        </div>

        <button
          type="submit"
          disabled={!formData.jdText.trim()}
          className="w-full bg-primary hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Analyze Job Description
        </button>
      </form>
    </div>
  )
}

export default Practice
