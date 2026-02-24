# Company Intel & Round Mapping Test Scenarios

## ✅ Features Implemented

### 1. Company Intel Block
- Company name display
- Industry inference (heuristic-based)
- Size category estimation (Startup/Mid-size/Enterprise)
- Typical hiring focus based on company size
- Demo mode disclaimer

### 2. Round Mapping Engine
- Dynamic round generation based on company size + skills
- Vertical timeline visualization
- Round duration estimates
- Focus areas per round
- "Why this matters" explanations

### 3. Heuristic Rules
- **Enterprise**: Amazon, Google, Microsoft, TCS, Infosys, etc. (40+ companies)
- **Mid-size**: Zomato, Swiggy, Paytm, Freshworks, etc. (20+ companies)
- **Startup**: Default for unknown companies
- **Industry**: Inferred from keywords (fintech, ecommerce, healthcare, etc.)

---

## 🧪 TEST SCENARIOS

### Scenario 1: Enterprise Company with DSA Focus

**Input:**
- Company: `Amazon`
- Role: `Software Development Engineer`
- JD: Include keywords like `Java`, `DSA`, `algorithms`, `system design`

**Expected Output:**
- Size: `Enterprise (2000+)`
- Industry: `Technology Services` or `E-commerce & Retail`
- Hiring Focus: `Structured & Comprehensive`
  - Strong emphasis on DSA
  - Core CS fundamentals required
  - Multiple rounds with increasing difficulty
  
**Round Mapping:**
1. Online Assessment (60-90 mins)
   - Focus: DSA + Aptitude + Basic CS
   - Why: Filters candidates at scale
2. Technical Round 1 (45-60 mins)
   - Focus: Advanced DSA + Time/Space Complexity
   - Why: Evaluates depth of CS knowledge
3. Technical Round 2 (45-60 mins)
   - Focus: System Design + Stack Discussion
   - Why: Assesses practical experience
4. Managerial/HR Round (30-45 mins)
   - Focus: STAR Method + Company Research
   - Why: Ensures cultural alignment

---

### Scenario 2: Mid-size Company with Web Stack

**Input:**
- Company: `Zomato`
- Role: `Full Stack Developer`
- JD: Include `React`, `Node.js`, `MongoDB`, `REST API`

**Expected Output:**
- Size: `Mid-size (200-2000)`
- Industry: `Technology Services` or `E-commerce & Retail`
- Hiring Focus: `Balanced Approach`
  - Mix of DSA and practical problem solving
  - Technology stack proficiency important
  - Project experience valued

**Round Mapping:**
1. Coding Assessment (60 mins)
   - Focus: DSA + Stack-specific Questions
   - Why: Quick filter for coding ability
2. Technical Interview (60 mins)
   - Focus: Stack Proficiency + Projects
   - Why: Deep dive into technical skills
3. Team Fit Round (30-45 mins)
   - Focus: Teamwork + Communication
   - Why: Ensures team collaboration

---

### Scenario 3: Startup with Practical Focus

**Input:**
- Company: `TechStartup` (unknown company)
- Role: `Frontend Developer`
- JD: Include `React`, `TypeScript`, `GraphQL`

**Expected Output:**
- Size: `Startup (<200)`
- Industry: `Technology Services`
- Hiring Focus: `Practical & Fast-paced`
  - Hands-on coding and problem solving
  - Deep knowledge of relevant tech stack
  - Ability to ship features quickly
  - Ownership and initiative valued

**Round Mapping:**
1. Practical Coding Challenge (60-90 mins)
   - Focus: Full-stack Implementation
   - Why: Tests ability to write production-ready code
2. Technical Discussion (45-60 mins)
   - Focus: System Architecture + Stack Expertise
   - Why: Evaluates technical depth and decision-making
3. Culture & Vision Fit (30 mins)
   - Focus: Ownership + Initiative + Product Thinking
   - Why: Startups need people who thrive in ambiguity

---

### Scenario 4: Fintech Company

**Input:**
- Company: `PaymentCorp`
- Role: `Backend Engineer`
- JD: Include `payment`, `fintech`, `Java`, `SQL`, `security`

**Expected Output:**
- Size: `Startup (<200)` (if unknown)
- Industry: `Financial Technology`
- Hiring Focus: Based on size category
- Round Mapping: Adapted to detected skills (Java, SQL)

---

### Scenario 5: Consulting Firm

**Input:**
- Company: `Infosys`
- Role: `Systems Engineer`
- JD: Include `consulting`, `services`, `Java`, `DBMS`, `OOP`

**Expected Output:**
- Size: `Enterprise (2000+)`
- Industry: `IT Consulting & Services`
- Hiring Focus: `Structured & Comprehensive`
- Round Mapping: 4 rounds with DSA focus

---

### Scenario 6: No Company Name Provided

**Input:**
- Company: `` (empty)
- Role: `Software Engineer`
- JD: Generic JD with basic skills

**Expected Output:**
- Company Intel block should NOT appear
- Only show: Skills, Checklist, Plan, Questions
- No round mapping displayed

---

## 🔍 VERIFICATION STEPS

### Step 1: Test Enterprise Company
1. Go to JD Analysis
2. Enter: Company = `Google`, Role = `SDE`
3. Paste JD with DSA keywords
4. Analyze and verify:
   - ✓ Company Intel shows "Enterprise (2000+)"
   - ✓ Hiring focus mentions "structured DSA"
   - ✓ 4 rounds displayed in timeline
   - ✓ Round 1 mentions "Online Assessment"
   - ✓ Each round has "Why this matters"

### Step 2: Test Mid-size Company
1. Enter: Company = `Swiggy`, Role = `Full Stack`
2. Paste JD with React, Node.js
3. Verify:
   - ✓ Shows "Mid-size (200-2000)"
   - ✓ Hiring focus mentions "balanced approach"
   - ✓ 3 rounds displayed
   - ✓ Focus includes "Stack Proficiency"

### Step 3: Test Unknown Startup
1. Enter: Company = `MyStartup`, Role = `Developer`
2. Paste JD with web technologies
3. Verify:
   - ✓ Shows "Startup (<200)"
   - ✓ Hiring focus mentions "practical & fast-paced"
   - ✓ 3 rounds with practical focus
   - ✓ Round 1 is "Practical Coding Challenge"

### Step 4: Test Industry Inference
1. Enter: Company = `HealthTech`, JD with "healthcare" keywords
2. Verify: Industry shows "Healthcare Technology"
3. Enter: Company = `FinPay`, JD with "payment" keywords
4. Verify: Industry shows "Financial Technology"

### Step 5: Test Persistence
1. Create analysis with company intel
2. Go to History
3. Refresh page
4. Open same entry
5. Verify: Company intel and round mapping still present

### Step 6: Test Without Company Name
1. Leave company field empty
2. Analyze JD
3. Verify: No company intel block appears
4. Verify: Other sections still work normally

---

## 📊 Company Size Detection Examples

### Enterprise (Detected)
- Amazon, Google, Microsoft, Meta, Apple, Netflix
- Infosys, TCS, Wipro, Cognizant, Accenture
- IBM, Oracle, Salesforce, Adobe
- Goldman Sachs, JPMorgan, Morgan Stanley

### Mid-size (Detected)
- Zomato, Swiggy, Paytm, PhonePe, Razorpay
- Freshworks, Zoho, Postman, BrowserStack
- Atlassian, Slack, Dropbox, Twilio

### Startup (Default)
- Any company not in above lists
- Unknown or new companies
- Small product companies

---

## 🎨 Design Elements

### Company Intel Card
- Gradient background: indigo-50 to purple-50
- Border: 2px indigo-200
- Building icon for visual identity
- 3-column grid for company info
- White cards with subtle borders

### Round Mapping Timeline
- Vertical timeline with connecting line
- Numbered circles (primary color)
- Hover effect on round cards
- Duration badges (purple)
- Blue "Why this matters" boxes
- Responsive spacing

### Demo Mode Notice
- Italic text in gray
- Small font size
- Positioned near title
- Transparent about heuristic approach

---

## 🔧 Technical Implementation

### Heuristic Rules
```javascript
// Company size detection
if (companyName includes ENTERPRISE_LIST) → Enterprise
else if (companyName includes MID_SIZE_LIST) → Mid-size
else → Startup

// Industry inference
if (text includes 'fintech' or 'payment') → Financial Technology
if (text includes 'ecommerce' or 'retail') → E-commerce & Retail
if (text includes 'healthcare') → Healthcare Technology
else → Technology Services

// Round mapping
if (Enterprise + DSA) → 4 rounds, structured approach
if (Mid-size + Web) → 3 rounds, balanced approach
if (Startup + any) → 3 rounds, practical focus
```

### Persistence
- Saved in `companyIntel` field of history entry
- Includes: company, industry, size, hiringFocus, roundMapping
- Survives page refresh
- Displayed when reopening from history

---

## ✨ Key Features

1. **No External APIs** - All heuristic-based
2. **Works Offline** - No network required
3. **Persists in History** - Saved with each analysis
4. **Adaptive Rounds** - Changes based on company + skills
5. **Educational** - "Why this matters" for each round
6. **Premium Design** - Calm, intentional, professional
7. **Demo Transparency** - Clear about heuristic approach
