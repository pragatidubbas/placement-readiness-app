import CircularProgress from '../components/CircularProgress'
import SkillRadarChart from '../components/SkillRadarChart'
import { Calendar, Clock } from 'lucide-react'

function Dashboard() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const activeDays = [true, true, false, true, true, false, false]

  const upcomingAssessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Overall Readiness */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Overall Readiness</h3>
          <div className="flex flex-col items-center">
            <CircularProgress value={72} max={100} />
            <p className="mt-4 text-lg font-medium text-gray-700">Readiness Score</p>
            <p className="text-sm text-gray-500 mt-1">Keep going! You're making great progress</p>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Skill Breakdown</h3>
          <SkillRadarChart />
        </div>

        {/* Continue Practice */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Practice</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium text-gray-800">Dynamic Programming</span>
                <span className="text-sm text-gray-500">3/10 completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: '30%' }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Continue
            </button>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Problems Solved</span>
                <span className="text-sm font-semibold text-gray-900">12/20 this week</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            
            {/* Day circles */}
            <div className="flex justify-between items-center pt-2">
              {weekDays.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      activeDays[index] 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {day.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
          <div className="space-y-3">
            {upcomingAssessments.map((assessment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{assessment.time}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
