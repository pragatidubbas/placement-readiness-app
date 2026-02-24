// Skill extraction and analysis utilities

export const SKILL_CATEGORIES = {
  coreCS: {
    name: 'Core CS',
    keywords: ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database', 'os', 'operating system', 'networks', 'networking', 'computer networks']
  },
  languages: {
    name: 'Languages',
    keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'cpp', 'c#', 'csharp', 'go', 'golang', 'c programming']
  },
  web: {
    name: 'Web',
    keywords: ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'graphql', 'api', 'frontend', 'backend']
  },
  data: {
    name: 'Data',
    keywords: ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'nosql', 'database']
  },
  cloudDevOps: {
    name: 'Cloud/DevOps',
    keywords: ['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'linux', 'devops', 'cloud']
  },
  testing: {
    name: 'Testing',
    keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'test automation', 'qa']
  }
}

export function extractSkills(jdText) {
  const lowerText = jdText.toLowerCase()
  const extracted = {}
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    const found = SKILL_CATEGORIES[category].keywords.filter(keyword => 
      lowerText.includes(keyword)
    )
    if (found.length > 0) {
      extracted[category] = {
        name: SKILL_CATEGORIES[category].name,
        skills: [...new Set(found)]
      }
    }
  })
  
  return extracted
}

export function calculateReadinessScore(jdText, company, role, extractedSkills) {
  let score = 35 // Base score
  
  // +5 per category detected (max 30)
  const categoriesFound = Object.keys(extractedSkills).length
  score += Math.min(categoriesFound * 5, 30)
  
  // +10 if company provided
  if (company && company.trim().length > 0) {
    score += 10
  }
  
  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10
  }
  
  // +10 if JD length > 800 chars
  if (jdText.length > 800) {
    score += 10
  }
  
  return Math.min(score, 100)
}

export function generateChecklist(extractedSkills) {
  const hasSkill = (category) => extractedSkills[category] !== undefined
  
  return {
    round1: {
      title: 'Round 1: Aptitude & Basics',
      items: [
        'Practice quantitative aptitude (numbers, percentages, ratios)',
        'Solve logical reasoning puzzles',
        'Review verbal ability and comprehension',
        'Practice time management for MCQ tests',
        'Take 2-3 mock aptitude tests',
        'Review basic mathematics and statistics',
        'Practice pattern recognition problems'
      ]
    },
    round2: {
      title: 'Round 2: DSA & Core CS',
      items: [
        hasSkill('coreCS') ? 'Review data structures: arrays, linked lists, trees, graphs' : 'Study fundamental data structures',
        hasSkill('coreCS') ? 'Practice algorithm problems: sorting, searching, dynamic programming' : 'Learn basic algorithms',
        hasSkill('coreCS') ? 'Revise OOP concepts: inheritance, polymorphism, encapsulation' : 'Understand OOP principles',
        hasSkill('coreCS') ? 'Study DBMS: normalization, indexing, transactions' : 'Learn database basics',
        hasSkill('coreCS') ? 'Review OS concepts: processes, threads, memory management' : 'Understand OS fundamentals',
        hasSkill('coreCS') ? 'Revise computer networks: TCP/IP, HTTP, DNS' : 'Learn networking basics',
        'Solve 20+ coding problems on LeetCode/HackerRank',
        'Practice explaining time and space complexity'
      ]
    },
    round3: {
      title: 'Round 3: Technical Interview',
      items: [
        hasSkill('languages') ? `Master ${extractedSkills.languages?.skills.slice(0, 2).join(' and ')} syntax and features` : 'Be fluent in at least one programming language',
        hasSkill('web') ? 'Prepare to explain your web development projects in detail' : 'Review your project work thoroughly',
        hasSkill('web') && hasSkill('data') ? 'Be ready to discuss full-stack architecture decisions' : 'Understand system architecture basics',
        hasSkill('cloudDevOps') ? 'Explain your experience with cloud services and deployment' : 'Learn about deployment basics',
        hasSkill('testing') ? 'Discuss testing strategies and automation experience' : 'Understand testing fundamentals',
        'Prepare to walk through 2-3 projects in depth',
        'Practice explaining technical decisions and trade-offs',
        'Be ready to write code on a whiteboard or shared editor'
      ]
    },
    round4: {
      title: 'Round 4: Managerial & HR',
      items: [
        'Prepare your "Tell me about yourself" story (2-3 minutes)',
        'Practice STAR method for behavioral questions',
        'Prepare examples of teamwork and conflict resolution',
        'Research the company culture and values',
        'Prepare thoughtful questions to ask the interviewer',
        'Practice explaining career goals and motivation',
        'Review your resume and be ready to discuss every point',
        'Prepare for "Why this company?" and "Why this role?"'
      ]
    }
  }
}

export function generate7DayPlan(extractedSkills) {
  const hasSkill = (category) => extractedSkills[category] !== undefined
  
  return [
    {
      day: 1,
      title: 'Foundation & Core CS',
      tasks: [
        'Review core CS fundamentals (DSA, OOP, DBMS)',
        hasSkill('coreCS') ? 'Deep dive into OS and networking concepts' : 'Study basic computer science concepts',
        'Solve 5 easy coding problems',
        'Review your resume and identify talking points'
      ]
    },
    {
      day: 2,
      title: 'Language & Syntax Mastery',
      tasks: [
        hasSkill('languages') ? `Practice ${extractedSkills.languages?.skills[0] || 'your primary language'} coding patterns` : 'Practice coding in your strongest language',
        'Solve 5 medium coding problems',
        hasSkill('data') ? 'Review SQL queries and database design' : 'Learn basic SQL queries',
        'Study common design patterns'
      ]
    },
    {
      day: 3,
      title: 'DSA Deep Dive',
      tasks: [
        'Focus on arrays, strings, and hash maps',
        'Practice tree and graph traversal problems',
        'Solve 7 coding problems (mix of easy and medium)',
        'Review time and space complexity analysis'
      ]
    },
    {
      day: 4,
      title: 'Advanced DSA & Problem Solving',
      tasks: [
        'Practice dynamic programming problems',
        'Study greedy algorithms and backtracking',
        'Solve 5 medium to hard problems',
        'Review common algorithm patterns'
      ]
    },
    {
      day: 5,
      title: 'Projects & Stack Alignment',
      tasks: [
        hasSkill('web') ? 'Review React/Node.js concepts and your web projects' : 'Review your key projects in detail',
        hasSkill('cloudDevOps') ? 'Prepare to discuss deployment and DevOps experience' : 'Understand basic deployment concepts',
        'Practice explaining technical architecture decisions',
        'Update resume with quantifiable achievements'
      ]
    },
    {
      day: 6,
      title: 'Mock Interviews & Behavioral Prep',
      tasks: [
        'Do 2 mock technical interviews with peers',
        'Practice behavioral questions using STAR method',
        'Prepare "Tell me about yourself" pitch',
        'Research the company and prepare questions'
      ]
    },
    {
      day: 7,
      title: 'Revision & Weak Areas',
      tasks: [
        'Review notes from all previous days',
        'Revisit problems you struggled with',
        'Practice explaining concepts out loud',
        'Get good rest and stay confident'
      ]
    }
  ]
}

export function generateInterviewQuestions(extractedSkills) {
  const questions = []
  const hasSkill = (category) => extractedSkills[category] !== undefined
  
  // Core CS questions
  if (hasSkill('coreCS')) {
    questions.push(
      'Explain the difference between stack and heap memory allocation.',
      'What is the difference between process and thread? When would you use multithreading?',
      'Explain database indexing and when it helps performance.',
      'What are the ACID properties in database transactions?'
    )
  }
  
  // DSA questions
  if (hasSkill('coreCS')) {
    questions.push(
      'How would you optimize search in sorted data? Explain binary search.',
      'Explain the difference between BFS and DFS. When would you use each?',
      'What is dynamic programming? Explain with an example.'
    )
  }
  
  // Language-specific questions
  if (hasSkill('languages')) {
    const langs = extractedSkills.languages.skills
    if (langs.some(l => l.includes('java'))) {
      questions.push('Explain the difference between abstract class and interface in Java.')
    }
    if (langs.some(l => l.includes('python'))) {
      questions.push('What are decorators in Python and how do they work?')
    }
    if (langs.some(l => l.includes('javascript') || l.includes('typescript'))) {
      questions.push('Explain closures in JavaScript with a practical example.')
    }
  }
  
  // Web development questions
  if (hasSkill('web')) {
    questions.push(
      'Explain state management options in React. When would you use Context vs Redux?',
      'What is the difference between REST and GraphQL APIs?',
      'How does the event loop work in Node.js?'
    )
  }
  
  // Database questions
  if (hasSkill('data')) {
    questions.push(
      'Explain the difference between SQL and NoSQL databases. When would you use each?',
      'What is database normalization and why is it important?'
    )
  }
  
  // Cloud/DevOps questions
  if (hasSkill('cloudDevOps')) {
    questions.push(
      'Explain the benefits of containerization with Docker.',
      'What is CI/CD and why is it important in modern development?'
    )
  }
  
  // Testing questions
  if (hasSkill('testing')) {
    questions.push(
      'What is the difference between unit testing and integration testing?'
    )
  }
  
  // General questions if not enough specific ones
  while (questions.length < 10) {
    const general = [
      'Describe a challenging technical problem you solved and your approach.',
      'How do you stay updated with new technologies?',
      'Explain a time when you had to optimize code for performance.',
      'What is your approach to debugging complex issues?',
      'How do you ensure code quality in your projects?',
      'Explain the software development lifecycle you follow.',
      'What is your experience with version control systems like Git?',
      'How do you handle technical debt in projects?'
    ]
    const randomQuestion = general[Math.floor(Math.random() * general.length)]
    if (!questions.includes(randomQuestion)) {
      questions.push(randomQuestion)
    }
  }
  
  return questions.slice(0, 10)
}
