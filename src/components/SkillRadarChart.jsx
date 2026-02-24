import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

function SkillRadarChart() {
  const data = [
    { skill: 'DSA', value: 75 },
    { skill: 'System Design', value: 60 },
    { skill: 'Communication', value: 80 },
    { skill: 'Resume', value: 85 },
    { skill: 'Aptitude', value: 70 }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#9CA3AF', fontSize: 10 }}
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="hsl(245, 58%, 51%)"
          fill="hsl(245, 58%, 51%)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default SkillRadarChart
