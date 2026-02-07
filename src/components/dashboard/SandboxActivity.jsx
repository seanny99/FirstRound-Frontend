import React from 'react'

const sandboxActivities = [
  { name: 'Emily', detail: '3 min elapsed', status: 'Interviewing', barColor: 'orange' },
  { name: 'AI Engineer', detail: 'John Doe Completed in 30 min', status: 'Interviewed', barColor: 'blue' },
]

export function SandboxActivity() {
  return (
    <div className="sandbox-panel">
      <h3 className="sandbox-panel-title">AI Interactive Sandbox</h3>
      <p className="sandbox-panel-desc">
        Live environment: candidates prove skills in real time. Eliminates resume fraud—code, tasks, and behavior verified.
      </p>
      <ul className="sandbox-activity-list">
        {sandboxActivities.map((item, i) => (
          <li key={i} className={`sandbox-activity-item bar-${item.barColor}`}>
            <div className="sandbox-activity-bar" />
            <div className="sandbox-activity-content">
              <span className="sandbox-activity-name">{item.name}</span>
              <span className="sandbox-activity-detail">{item.detail}</span>
            </div>
            <span className="sandbox-activity-status">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
