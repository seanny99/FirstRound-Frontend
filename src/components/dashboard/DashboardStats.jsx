import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const statsData = [
  { label: 'Hiring', value: '2', sub: '/100', color: 'dark' },
  { label: 'Interviewing', value: '12', color: 'orange' },
  { label: 'Interviewed', value: '89', color: 'blue' },
  { label: 'Fraud', value: '1', color: 'dark' },
]

export function DashboardStats() {
  return (
    <div className="dashboard-stats">
      {statsData.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className="stat-icon-wrap">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
          <div className="stat-value-wrap">
            <span className={`stat-value value-${stat.color}`}>{stat.value}</span>
            {stat.sub && <span className="stat-sub">{stat.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
