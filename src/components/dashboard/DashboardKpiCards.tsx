import React from 'react'

const ArrowIcon: React.FC = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="kpi-card-icon">
            <path d="M7 17L17 7M17 7h-10M17 7v10" />
        </svg>
    )
}

interface KpiCardData {
    title: string
    value: string
    valueSuffix?: string
    valueColor: 'dark' | 'orange' | 'blue'
    showSmallArrow?: boolean
}

const kpiCards: KpiCardData[] = [
    { title: 'Hiring', value: '2', valueSuffix: '/100', valueColor: 'dark', showSmallArrow: true },
    { title: 'Interviewing', value: '12', valueSuffix: '', valueColor: 'orange' },
    { title: 'Interviewed', value: '89', valueSuffix: '', valueColor: 'blue' },
    { title: 'Fraud', value: '1', valueSuffix: '', valueColor: 'dark' },
]

export const DashboardKpiCards: React.FC = () => {
    return (
        <div className="dashboard-kpi-cards">
            {kpiCards.map((card) => (
                <div key={card.title} className="kpi-card">
                    <div className="kpi-card-icon-wrap">
                        <ArrowIcon />
                    </div>
                    <div className="kpi-card-body">
                        <span className="kpi-card-label">{card.title}</span>
                        <div className="kpi-card-value-row">
                            <span className={`kpi-card-value kpi-value-${card.valueColor}`}>
                                {card.value}
                                {card.showSmallArrow && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="kpi-value-arrow">
                                        <path d="M7 17L17 7M17 7h-10M17 7v10" />
                                    </svg>
                                )}
                            </span>
                            {card.valueSuffix && <span className="kpi-card-value-suffix">{card.valueSuffix}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
