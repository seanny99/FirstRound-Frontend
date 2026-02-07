import React from 'react'

export function JobsStats({ stats }) {
    return (
        <div className="dashboard-kpi-cards jobs-kpi-cards">
            {stats.map((stat) => (
                <div key={stat.label} className="kpi-card">
                    <div className="kpi-card-body">
                        <span className="kpi-card-label">{stat.label}</span>
                        <div className="kpi-card-value-row">
                            <span className="kpi-card-value kpi-value-dark">{stat.value}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
