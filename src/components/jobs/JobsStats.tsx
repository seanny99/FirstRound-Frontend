import React from 'react'

interface JobStat {
    label: string
    value: string
    badge?: string
}

interface JobsStatsProps {
    stats: JobStat[]
}

export const JobsStats: React.FC<JobsStatsProps> = ({ stats }) => {
    return (
        <div className="dashboard-kpi-cards jobs-kpi-cards">
            {stats.map((stat) => (
                <div key={stat.label} className="kpi-card">
                    <span className="kpi-card-label">{stat.label}</span>
                    <div className="kpi-card-value-row">
                        <span className="kpi-card-value kpi-value-dark">{stat.value}</span>
                        {stat.badge && <span className="kpi-badge-success">{stat.badge}</span>}
                    </div>
                </div>
            ))}
        </div>
    )
}
