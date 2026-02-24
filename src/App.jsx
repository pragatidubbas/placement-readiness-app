import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import Assessments from './pages/Assessments'
import Resources from './pages/Resources'
import Profile from './pages/Profile'
import Results from './pages/Results'
import TestChecklist from './pages/TestChecklist'
import Ship from './pages/Ship'
import ResumeBuilderLayout from './layouts/ResumeBuilderLayout'
import Problem from './pages/rb/Problem'
import Market from './pages/rb/Market'
import Architecture from './pages/rb/Architecture'
import HLD from './pages/rb/HLD'
import LLD from './pages/rb/LLD'
import Build from './pages/rb/Build'
import Test from './pages/rb/Test'
import RBShip from './pages/rb/Ship'
import Proof from './pages/rb/Proof'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="results" element={<Results />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/prp/07-test" element={<TestChecklist />} />
      <Route path="/prp/08-ship" element={<Ship />} />
      
      {/* Resume Builder Routes */}
      <Route path="/rb" element={<ResumeBuilderLayout />}>
        <Route path="01-problem" element={<Problem />} />
        <Route path="02-market" element={<Market />} />
        <Route path="03-architecture" element={<Architecture />} />
        <Route path="04-hld" element={<HLD />} />
        <Route path="05-lld" element={<LLD />} />
        <Route path="06-build" element={<Build />} />
        <Route path="07-test" element={<Test />} />
        <Route path="08-ship" element={<RBShip />} />
      </Route>
      <Route path="/rb/proof" element={<Proof />} />
    </Routes>
  )
}

export default App
