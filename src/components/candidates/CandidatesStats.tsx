import React from 'react'

interface CandidateStat {
    label: string
    value: string
    badge?: string
    sub?: string
}

export const CandidatesStats: React.FC = () => {
    const stats: CandidateStat[] = [
        { label: 'Total Candidates', value: '100', badge: '+10' },
        { label: 'Active Candidates', value: '89', badge: '+10' },
        { label: 'New This Week', value: '12', badge: '+10' },
        { label: 'Hired', value: '5', badge: '+10' },
    ]

    return (
        <div className="dashboard-kpi-cards">
            {stats.map((stat, index) => (
                <div key={index} className="kpi-card">
                    <span className="kpi-card-label">{stat.label}</span>
                    <div className="kpi-card-value-row">
                        <span className="kpi-card-value kpi-value-dark">{stat.value}</span>
                        {stat.sub && <span className="stat-value-suffix">{stat.sub}</span>}
                        {stat.badge && (
                            <span className="kpi-badge-success">
                                {stat.badge}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
