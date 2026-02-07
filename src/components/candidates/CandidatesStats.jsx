import React from 'react'
import { ArrowUp } from 'lucide-react'

export function CandidatesStats() {
    const stats = [
        { label: 'Total Candidates', value: '100', badge: '+10', badgeColor: 'green' },
        { label: 'Avg. Assessment', value: '78.5', sub: '/100' },
        { label: 'Successful Hires', value: '10', badge: '+1', badgeColor: 'green' },
    ]

    return (
        <div className="dashboard-stats candidates-stats">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <span className="stat-label">{stat.label}</span>
                    <div className="stat-value-row">
                        <span className="stat-value">{stat.value}</span>
                        {stat.sub && <span className="stat-value-suffix">{stat.sub}</span>}
                        {stat.badge && (
                            <span className={`stats-badge badge-${stat.badgeColor}`}>
                                {stat.badge}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
