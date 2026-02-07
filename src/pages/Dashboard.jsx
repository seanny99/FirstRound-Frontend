import React from 'react'
import { DashboardKpiCards } from '../components/dashboard/DashboardKpiCards'
import { ProactiveSourcePanel, ReactiveSourcePanel } from '../components/dashboard/SourcePanel'
import { SandboxActivity } from '../components/dashboard/SandboxActivity'

export function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <DashboardKpiCards />
      <div className="dashboard-source-row">
        <ProactiveSourcePanel />
        <ReactiveSourcePanel />
      </div>
      <SandboxActivity />
    </div>
  )
}
