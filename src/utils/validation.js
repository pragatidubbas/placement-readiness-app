// Input validation utilities

export const MIN_JD_LENGTH = 200

export function validateJDInput(jdText) {
  const errors = []
  const warnings = []
  
  if (!jdText || jdText.trim().length === 0) {
    errors.push('Job description is required')
  } else if (jdText.trim().length < MIN_JD_LENGTH) {
    warnings.push(`This JD is too short to analyze deeply. Paste full JD for better output. (${jdText.trim().length}/${MIN_JD_LENGTH} characters)`)
  }
  
  return { errors, warnings, isValid: errors.length === 0 }
}

export function validateAnalysisEntry(entry) {
  // Check if entry has all required fields
  const requiredFields = [
    'id',
    'createdAt',
    'jdText',
    'extractedSkills',
    'checklist',
    'plan',
    'questions',
    'readinessScore'
  ]
  
  for (const field of requiredFields) {
    if (!(field in entry)) {
      return false
    }
  }
  
  return true
}
