// Company intelligence and round mapping utilities

const ENTERPRISE_COMPANIES = [
  'amazon', 'google', 'microsoft', 'meta', 'facebook', 'apple', 'netflix',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'capgemini', 'hcl',
  'ibm', 'oracle', 'salesforce', 'adobe', 'intel', 'cisco', 'dell', 'hp',
  'deloitte', 'pwc', 'ey', 'kpmg', 'jpmorgan', 'goldman sachs', 'morgan stanley',
  'walmart', 'target', 'uber', 'airbnb', 'linkedin', 'twitter', 'snap',
  'paypal', 'stripe', 'square', 'visa', 'mastercard', 'american express'
]

const MID_SIZE_COMPANIES = [
  'zomato', 'swiggy', 'paytm', 'phonepe', 'razorpay', 'freshworks',
  'zoho', 'postman', 'browserstack', 'clevertap', 'chargebee',
  'atlassian', 'slack', 'dropbox', 'twilio', 'zendesk', 'hubspot',
  'shopify', 'spotify', 'reddit', 'pinterest', 'booking.com'
]

export function inferCompanySize(companyName) {
  if (!companyName) return 'startup'
  
  const lower = companyName.toLowerCase().trim()
  
  if (ENTERPRISE_COMPANIES.some(c => lower.includes(c))) {
    return 'enterprise'
  }
  
  if (MID_SIZE_COMPANIES.some(c => lower.includes(c))) {
    return 'midsize'
  }
  
  return 'startup'
}

export function inferIndustry(companyName, jdText) {
  if (!companyName && !jdText) return 'Technology Services'
  
  const text = `${companyName} ${jdText}`.toLowerCase()
  
  if (text.includes('fintech') || text.includes('payment') || text.includes('banking') || text.includes('finance')) {
    return 'Financial Technology'
  }
  
  if (text.includes('ecommerce') || text.includes('e-commerce') || text.includes('retail') || text.includes('shopping')) {
    return 'E-commerce & Retail'
  }
  
  if (text.includes('healthcare') || text.includes('medical') || text.includes('health')) {
    return 'Healthcare Technology'
  }
  
  if (text.includes('education') || text.includes('edtech') || text.includes('learning')) {
    return 'Education Technology'
  }
  
  if (text.includes('cloud') || text.includes('saas') || text.includes('platform')) {
    return 'Cloud & SaaS'
  }
  
  if (text.includes('consulting') || text.includes('services')) {
    return 'IT Consulting & Services'
  }
  
  return 'Technology Services'
}

export function getCompanySizeLabel(size) {
  switch (size) {
    case 'enterprise':
      return 'Enterprise (2000+)'
    case 'midsize':
      return 'Mid-size (200-2000)'
    case 'startup':
      return 'Startup (<200)'
    default:
      return 'Unknown'
  }
}

export function getHiringFocus(size) {
  switch (size) {
    case 'enterprise':
      return {
        title: 'Structured & Comprehensive',
        points: [
          'Strong emphasis on data structures and algorithms',
          'Core computer science fundamentals required',
          'Multiple rounds with increasing difficulty',
          'Behavioral and cultural fit assessment',
          'Focus on scalability and system design'
        ]
      }
    case 'midsize':
      return {
        title: 'Balanced Approach',
        points: [
          'Mix of DSA and practical problem solving',
          'Technology stack proficiency important',
          'Project experience and portfolio review',
          'Team collaboration and communication skills',
          'Adaptability and learning mindset'
        ]
      }
    case 'startup':
      return {
        title: 'Practical & Fast-paced',
        points: [
          'Hands-on coding and problem solving',
          'Deep knowledge of relevant tech stack',
          'Ability to ship features quickly',
          'Ownership and initiative valued',
          'Cultural fit and passion for product'
        ]
      }
    default:
      return {
        title: 'General Approach',
        points: [
          'Problem solving and coding skills',
          'Technical knowledge assessment',
          'Communication and teamwork',
          'Learning ability and adaptability'
        ]
      }
  }
}

export function generateRoundMapping(companySize, extractedSkills) {
  const hasSkill = (category) => extractedSkills[category] !== undefined
  const hasDSA = hasSkill('coreCS')
  const hasWeb = hasSkill('web')
  const hasCloud = hasSkill('cloudDevOps')
  
  if (companySize === 'enterprise') {
    return [
      {
        round: 1,
        title: 'Online Assessment',
        description: 'Aptitude, logical reasoning, and coding problems',
        why: 'Filters candidates at scale. Tests fundamental problem-solving and coding ability under time pressure.',
        duration: '60-90 mins',
        focus: hasDSA ? 'DSA + Aptitude + Basic CS' : 'Aptitude + Basic Coding'
      },
      {
        round: 2,
        title: 'Technical Round 1',
        description: 'Data structures, algorithms, and core CS concepts',
        why: 'Evaluates depth of computer science knowledge and ability to solve complex algorithmic problems.',
        duration: '45-60 mins',
        focus: hasDSA ? 'Advanced DSA + Time/Space Complexity' : 'Problem Solving + Logic'
      },
      {
        round: 3,
        title: 'Technical Round 2',
        description: 'System design, projects, and technology stack',
        why: 'Assesses practical experience, architectural thinking, and ability to build scalable systems.',
        duration: '45-60 mins',
        focus: hasWeb || hasCloud ? 'System Design + Stack Discussion' : 'Projects + Technical Depth'
      },
      {
        round: 4,
        title: 'Managerial/HR Round',
        description: 'Behavioral questions, cultural fit, and career goals',
        why: 'Ensures alignment with company values, team dynamics, and long-term potential.',
        duration: '30-45 mins',
        focus: 'STAR Method + Company Research + Soft Skills'
      }
    ]
  }
  
  if (companySize === 'midsize') {
    return [
      {
        round: 1,
        title: 'Coding Assessment',
        description: 'Practical coding problems and technical MCQs',
        why: 'Quick filter for coding ability and technical knowledge relevant to the role.',
        duration: '60 mins',
        focus: hasDSA ? 'DSA + Stack-specific Questions' : 'Practical Coding Challenges'
      },
      {
        round: 2,
        title: 'Technical Interview',
        description: 'Live coding, problem solving, and project discussion',
        why: 'Deep dive into technical skills, coding practices, and real-world problem solving.',
        duration: '60 mins',
        focus: hasWeb ? 'Stack Proficiency + Projects' : 'Problem Solving + Core Concepts'
      },
      {
        round: 3,
        title: 'Team Fit Round',
        description: 'Collaboration style, communication, and cultural alignment',
        why: 'Ensures you can work effectively with the team and contribute to company culture.',
        duration: '30-45 mins',
        focus: 'Teamwork + Communication + Motivation'
      }
    ]
  }
  
  // Startup
  return [
    {
      round: 1,
      title: 'Practical Coding Challenge',
      description: 'Build a small feature or solve a real-world problem',
      why: 'Tests ability to write production-ready code and ship features quickly.',
      duration: '60-90 mins',
      focus: hasWeb ? 'Full-stack Implementation' : 'Practical Problem Solving'
    },
    {
      round: 2,
      title: 'Technical Discussion',
      description: 'Architecture, trade-offs, and technology choices',
      why: 'Evaluates technical depth, decision-making, and ability to justify choices.',
      duration: '45-60 mins',
      focus: hasWeb || hasCloud ? 'System Architecture + Stack Expertise' : 'Technical Depth + Projects'
    },
    {
      round: 3,
      title: 'Culture & Vision Fit',
      description: 'Passion for product, ownership mindset, and startup culture',
      why: 'Startups need people who thrive in ambiguity and take ownership of outcomes.',
      duration: '30 mins',
      focus: 'Ownership + Initiative + Product Thinking'
    }
  ]
}

export function generateCompanyIntel(company, role, jdText, extractedSkills) {
  const size = inferCompanySize(company)
  const industry = inferIndustry(company, jdText)
  const hiringFocus = getHiringFocus(size)
  const roundMapping = generateRoundMapping(size, extractedSkills)
  
  return {
    company: company || 'Unknown Company',
    industry,
    size,
    sizeLabel: getCompanySizeLabel(size),
    hiringFocus,
    roundMapping
  }
}
