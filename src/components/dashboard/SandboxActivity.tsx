import React from 'react'

interface Activity {
    name: string
    time: string
    status: string
    color: 'orange' | 'blue' | 'dark'
}

export const SandboxActivity: React.FC = () => {
    const activities: Activity[] = [
        { name: 'Emily', time: '3 min elapsed', status: 'Interviewing', color: 'orange' },
        { name: 'AI Engineer', time: 'John Doe - Completed in 30 min', status: 'Interviewed', color: 'blue' },
    ]

    return (
        <div className="sandbox-panel card">
            <div className="card-header">
                <h3 className="card-title">AI Interactive Sandbox</h3>
                <p className="card-subtitle">Live environment: candidates prove skills in real time. Eliminates resume fraud—code, tasks, and behavior verified.</p>
            </div>

            <div className="sandbox-list">
                {activities.map((item, index) => (
                    <div key={index} className="sandbox-item">
                        <div className={`sandbox-bar bar-${item.color}`} />
                        <div className="sandbox-content">
                            <span className="sandbox-name">{item.name}</span>
                            <span className="sandbox-time">{item.time}</span>
                        </div>
                        <span className="sandbox-status">{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
