import React from 'react'
import { Card, CardHeader } from '../ui/Card'

const defaultRankings = [
  { rank: 1, name: 'Alex Chen', role: 'Software Engineer', score: 92, status: 'Recommended' },
  { rank: 2, name: 'Jordan Lee', role: 'Product Manager', score: 88, status: 'Recommended' },
  { rank: 3, name: 'Sam Rivera', role: 'Data Analyst', score: 85, status: 'Review' },
  { rank: 4, name: 'Casey Kim', role: 'UX Designer', score: 81, status: 'Review' },
  { rank: 5, name: 'Morgan Taylor', role: 'Backend Dev', score: 78, status: 'Review' },
]

export function RankingsTable({ data = defaultRankings }) {
  return (
    <Card className="rankings-card">
      <CardHeader title="Candidate Rankings" subtitle="AI evaluation scores by role" />
      <div className="table-wrap">
        <table className="rankings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.rank}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.role}</td>
                <td><span className="score-badge">{row.score}</span></td>
                <td><span className={`status-badge status-${row.status.toLowerCase()}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
