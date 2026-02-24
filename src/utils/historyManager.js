// LocalStorage history management

const HISTORY_KEY = 'placement_analysis_history'

export function saveAnalysis(analysisData) {
  const history = getHistory()
  const now = new Date().toISOString()
  
  const newEntry = {
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
    skillConfidenceMap: {}, // Initialize empty confidence map
    currentReadinessScore: analysisData.readinessScore, // Initialize with base score
    ...analysisData
  }
  
  history.unshift(newEntry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  
  return newEntry
}

export function updateAnalysis(id, updates) {
  const history = getHistory()
  const index = history.findIndex(entry => entry.id === id)
  
  if (index !== -1) {
    history[index] = { 
      ...history[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return history[index]
  }
  
  return null
}

export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    if (!data) return []
    
    const parsed = JSON.parse(data)
    
    // Filter out corrupted entries
    const valid = parsed.filter(entry => {
      try {
        // Basic validation - must have essential fields
        return entry.id && entry.createdAt && entry.jdText
      } catch (error) {
        console.error('Corrupted entry detected:', error)
        return false
      }
    })
    
    // If some entries were filtered out, save the cleaned version
    if (valid.length !== parsed.length) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(valid))
    }
    
    return valid
  } catch (error) {
    console.error('Error reading history:', error)
    // Return empty array if localStorage is corrupted
    return []
  }
}

export function getAnalysisById(id) {
  const history = getHistory()
  return history.find(entry => entry.id === id)
}

export function deleteAnalysis(id) {
  const history = getHistory()
  const filtered = history.filter(entry => entry.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export function getCorruptedEntriesCount() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    if (!data) return 0
    
    const parsed = JSON.parse(data)
    const valid = parsed.filter(entry => entry.id && entry.createdAt && entry.jdText)
    
    return parsed.length - valid.length
  } catch (error) {
    return 0
  }
}
