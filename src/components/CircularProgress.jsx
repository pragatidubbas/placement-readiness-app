function CircularProgress({ value, max = 100 }) {
  const percentage = (value / max) * 100
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="hsl(245, 58%, 51%)"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">/ {max}</span>
      </div>
    </div>
  )
}

export default CircularProgress
