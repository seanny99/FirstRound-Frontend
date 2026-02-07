import React from 'react'
import { Card } from '../ui/Card'

const defaultStats = [
  { label: 'In Pipeline', value: 24 },
  { label: 'Completed Sandbox', value: 18 },
  { label: 'Recommended', value: 7 },
  { label: 'Pending Review', value: 5 },
]

export function DashboardStats({ items = defaultStats }) {
  return (
    <div className="dashboard-stats">
      {items.map((item) => (
        <Card key={item.label} className="stat-card">
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </Card>
      ))}
    </div>
  )
}
