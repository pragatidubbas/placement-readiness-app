// Resume Builder progress and artifact management

const PROGRESS_KEY = 'rb_progress'
const ARTIFACT_PREFIX = 'rb_step_'

export const STEPS = [
  { id: 1, path: '/rb/01-problem', title: 'Problem Definition', label: 'Problem' },
  { id: 2, path: '/rb/02-market', title: 'Market Research', label: 'Market' },
  { id: 3, path: '/rb/03-architecture', title: 'Architecture Design', label: 'Architecture' },
  { id: 4, path: '/rb/04-hld', title: 'High-Level Design', label: 'HLD' },
  { id: 5, path: '/rb/05-lld', title: 'Low-Level Design', label: 'LLD' },
  { id: 6, path: '/rb/06-build', title: 'Build Implementation', label: 'Build' },
  { id: 7, path: '/rb/07-test', title: 'Testing & QA', label: 'Test' },
  { id: 8, path: '/rb/08-ship', title: 'Ship to Production', label: 'Ship' }
]

export function getProgress() {
  try {
    const data = localStorage.getItem(PROGRESS_KEY)
    if (!data) {
      return {
        currentStep: 1,
        completedSteps: [],
        status: 'not-started'
      }
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading progress:', error)
    return {
      currentStep: 1,
      completedSteps: [],
      status: 'not-started'
    }
  }
}

export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export function getArtifact(stepId) {
  try {
    const key = `${ARTIFACT_PREFIX}${stepId}_artifact`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading artifact:', error)
    return null
  }
}

export function saveArtifact(stepId, artifact) {
  const key = `${ARTIFACT_PREFIX}${stepId}_artifact`
  localStorage.setItem(key, JSON.stringify({
    ...artifact,
    savedAt: new Date().toISOString()
  }))
}

export function isStepUnlocked(stepId) {
  const progress = getProgress()
  
  // Step 1 is always unlocked
  if (stepId === 1) return true
  
  // Check if previous step has artifact
  const previousStepId = stepId - 1
  const previousArtifact = getArtifact(previousStepId)
  
  return previousArtifact !== null
}

export function canProceedToNext(currentStepId) {
  const artifact = getArtifact(currentStepId)
  return artifact !== null
}

export function markStepComplete(stepId) {
  const progress = getProgress()
  
  if (!progress.completedSteps.includes(stepId)) {
    progress.completedSteps.push(stepId)
  }
  
  // Update current step to next if not already ahead
  if (progress.currentStep === stepId && stepId < 8) {
    progress.currentStep = stepId + 1
  }
  
  // Update status
  if (progress.completedSteps.length === 8) {
    progress.status = 'shipped'
  } else if (progress.completedSteps.length > 0) {
    progress.status = 'in-progress'
  }
  
  saveProgress(progress)
}

export function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY)
  
  // Clear all artifacts
  for (let i = 1; i <= 8; i++) {
    localStorage.removeItem(`${ARTIFACT_PREFIX}${i}_artifact`)
  }
}

export function getProofData() {
  try {
    const data = localStorage.getItem('rb_proof_data')
    return data ? JSON.parse(data) : {
      lovableLink: '',
      githubLink: '',
      deployLink: ''
    }
  } catch (error) {
    return {
      lovableLink: '',
      githubLink: '',
      deployLink: ''
    }
  }
}

export function saveProofData(data) {
  localStorage.setItem('rb_proof_data', JSON.stringify(data))
}
