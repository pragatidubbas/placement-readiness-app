// LocalStorage history management

const HISTORY_KEY = 'placement_analysis_history'

export function saveAnalysis(analysisData) {
  const history = getHistory()
  const newEntry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...analysisData
  }
  
  history.unshift(newEntry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  
  return newEntry
}

export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading history:', error)
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
