// Test checklist management

const CHECKLIST_KEY = 'prp_test_checklist'

export const TEST_ITEMS = [
  {
    id: 'jd-validation',
    label: 'JD required validation works',
    hint: 'Go to JD Analysis, leave JD empty, verify submit button is disabled and error shows'
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter JD with <200 characters, verify yellow warning appears with character count'
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze JD with various tech keywords, verify skills are grouped by category (Core CS, Languages, Web, etc.)'
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Google" (Enterprise) vs "MyStartup" (Startup), verify different round structures'
  },
  {
    id: 'score-calculation',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice, verify identical base scores. Toggle skills, verify +2/-2 changes'
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On Results page, click skill tags, verify score updates immediately without refresh'
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, note score, refresh page (F5), go to History → View, verify toggles and score preserved'
  },
  {
    id: 'history-saves',
    label: 'History saves and loads correctly',
    hint: 'Create 2-3 analyses, go to History, verify all entries shown with correct data'
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click Copy buttons for Plan/Checklist/Questions, paste in text editor, verify format is correct'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools Console, navigate through Landing → Dashboard → JD Analysis → Results → History, verify no red errors'
  }
]

export function getChecklist() {
  try {
    const data = localStorage.getItem(CHECKLIST_KEY)
    if (!data) return {}
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading checklist:', error)
    return {}
  }
}

export function updateChecklistItem(itemId, checked) {
  const checklist = getChecklist()
  checklist[itemId] = checked
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist))
  return checklist
}

export function resetChecklist() {
  localStorage.removeItem(CHECKLIST_KEY)
  return {}
}

export function getChecklistProgress() {
  const checklist = getChecklist()
  const total = TEST_ITEMS.length
  const passed = Object.values(checklist).filter(Boolean).length
  return { passed, total, isComplete: passed === total }
}

export function isShipUnlocked() {
  const { isComplete } = getChecklistProgress()
  return isComplete
}
