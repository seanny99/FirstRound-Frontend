import React from 'react'

export interface CandidateStatItem {
  label: string
  value: number
  badge?: string
}

interface CandidatesStatsProps {
  /** Total candidate count (from API). Card shown only when defined. */
  total?: number
  /** Active candidates (e.g. in progress). Card shown only when defined. */
  active?: number
  /** New candidates in the last 7 days. Card shown only when defined. */
  newThisWeek?: number
  /** Hired count. Card shown only when defined. */
  hired?: number
  /** Optional trend badges; only shown when provided (e.g. "+10"). */
  badgeTotal?: string
  badgeActive?: string
  badgeNewThisWeek?: string
  badgeHired?: string
}

export const CandidatesStats: React.FC<CandidatesStatsProps> = ({
  total,
  active,
  newThisWeek,
  hired,
  badgeTotal,
  badgeActive,
  badgeNewThisWeek,
  badgeHired,
}) => {
  const cards: { label: string; value: number; badge?: string }[] = []

  if (total !== undefined && total !== null) {
    cards.push({ label: 'Total Candidates', value: total, badge: badgeTotal })
  }
  if (active !== undefined && active !== null) {
    cards.push({ label: 'Active Candidates', value: active, badge: badgeActive })
  }
  if (newThisWeek !== undefined && newThisWeek !== null) {
    cards.push({ label: 'New This Week', value: newThisWeek, badge: badgeNewThisWeek })
  }
  if (hired !== undefined && hired !== null) {
    cards.push({ label: 'Hired', value: hired, badge: badgeHired })
  }

  if (cards.length === 0) return null

  return (
    <div className="dashboard-kpi-cards">
      {cards.map((stat) => (
        <div key={stat.label} className="kpi-card">
          <span className="kpi-card-label">{stat.label}</span>
          <div className="kpi-card-value-row">
            <span className="kpi-card-value kpi-value-dark">{stat.value}</span>
            {stat.badge != null && stat.badge !== '' && (
              <span className="kpi-value-suffix kpi-badge-success">{stat.badge}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
