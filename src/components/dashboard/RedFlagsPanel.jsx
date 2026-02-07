import React from 'react'
import { Card, CardHeader } from '../ui/Card'

const defaultFlags = [
  { id: 1, candidate: 'Morgan Taylor', type: 'Latency', detail: 'High tab-switch latency in sandbox', severity: 'medium' },
  { id: 2, candidate: 'Casey Kim', type: 'Gaze', detail: 'Low gaze consistency during interview', severity: 'low' },
  { id: 3, candidate: 'Sam Rivera', type: 'Tone', detail: 'Anomaly in tone analysis segment 2', severity: 'low' },
]

const severityColors = { high: 'red', medium: 'amber', low: 'yellow' }

export function RedFlagsPanel({ items = defaultFlags }) {
  return (
    <Card className="red-flags-card">
      <CardHeader title="Red Flags" subtitle="Items to review before hire / reject" />
      <ul className="red-flags-list">
        {items.map((item) => (
          <li key={item.id} className={`red-flag severity-${severityColors[item.severity]}`}>
            <div className="red-flag-header">
              <span className="red-flag-type">{item.type}</span>
              <span className="red-flag-severity">{item.severity}</span>
            </div>
            <div className="red-flag-candidate">{item.candidate}</div>
            <div className="red-flag-detail">{item.detail}</div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
