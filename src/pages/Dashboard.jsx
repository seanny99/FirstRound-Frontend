import React from 'react'
import { DashboardStats, RankingsTable, RedFlagsPanel } from '../components'

export function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>HR Dashboard & Analytics</h1>
        <p className="tagline">Rankings & Red Flags · Pentagon First Round</p>
      </header>
      <DashboardStats />
      <div className="dashboard-grid">
        <section className="dashboard-main">
          <RankingsTable />
        </section>
        <aside className="dashboard-sidebar">
          <RedFlagsPanel />
        </aside>
      </div>
    </div>
  )
}
