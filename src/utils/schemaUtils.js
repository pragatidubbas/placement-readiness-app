// Schema standardization and normalization utilities

export function normalizeExtractedSkills(extractedSkills) {
  // Ensure all categories exist, even if empty
  return {
    coreCS: extractedSkills.coreCS || { name: 'Core CS', skills: [] },
    languages: extractedSkills.languages || { name: 'Languages', skills: [] },
    web: extractedSkills.web || { name: 'Web', skills: [] },
    data: extractedSkills.data || { name: 'Data', skills: [] },
    cloudDevOps: extractedSkills.cloudDevOps || { name: 'Cloud/DevOps', skills: [] },
    testing: extractedSkills.testing || { name: 'Testing', skills: [] }
  }
}

export function addDefaultSkillsIfEmpty(extractedSkills) {
  const hasAnySkills = Object.values(extractedSkills).some(
    category => category.skills && category.skills.length > 0
  )
  
  if (!hasAnySkills) {
    // Add default "other" skills for general preparation
    return {
      ...extractedSkills,
      other: {
        name: 'General Skills',
        skills: ['Communication', 'Problem solving', 'Basic coding', 'Projects']
      }
    }
  }
  
  return extractedSkills
}

export function createStandardizedEntry(data) {
  const now = new Date().toISOString()
  
  return {
    // Core identification
    id: data.id || Date.now().toString(),
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now,
    
    // Input data
    company: data.company || '',
    role: data.role || '',
    jdText: data.jdText || '',
    
    // Analysis results
    extractedSkills: normalizeExtractedSkills(
      addDefaultSkillsIfEmpty(data.extractedSkills || {})
    ),
    
    // Preparation materials
    checklist: data.checklist || {},
    plan: data.plan || [],
    questions: data.questions || [],
    
    // Company intelligence
    companyIntel: data.companyIntel || null,
    
    // Scoring
    readinessScore: data.readinessScore || 35, // Base score
    currentReadinessScore: data.currentReadinessScore || data.readinessScore || 35,
    skillConfidenceMap: data.skillConfidenceMap || {},
    
    // Metadata
    version: '1.0'
  }
}

export function migrateOldEntry(entry) {
  // Handle entries from older versions
  try {
    return createStandardizedEntry(entry)
  } catch (error) {
    console.error('Failed to migrate entry:', error)
    return null
  }
}

export function calculateFinalScore(baseScore, skillConfidenceMap) {
  let score = baseScore
  
  Object.values(skillConfidenceMap).forEach(confidence => {
    if (confidence === 'know') {
      score += 2
    } else if (confidence === 'practice') {
      score -= 2
    }
  })
  
  // Bounds: 0-100
  return Math.max(0, Math.min(100, score))
}
