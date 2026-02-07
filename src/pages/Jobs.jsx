import React from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { JobsStats } from '../components/jobs/JobsStats'
import { JobsFilter } from '../components/jobs/JobsFilter'
import { JobsTable } from '../components/jobs/JobsTable'

const jobKpis = [
  { label: 'Open Job Positions', value: '100' },
  { label: 'Active Positions', value: '20' },
  { label: 'Total Candidates', value: '100' },
  { label: 'Successful Hires', value: '10' },
]

const jobPositions = [
  { id: 1, title: 'AI Engineer', status: 'Active', count: 2, timeline: '30 days', candidatesMore: 10 },
  { id: 2, title: 'Data Analyst', status: 'Active', count: 3, timeline: '30 days', candidatesMore: 10 },
]

const totalJobCount = 10

export function Jobs() {
  const addJobButton = (
    <button type="button" className="btn-add-job-position">
      <span className="btn-add-job-plus">+</span>
      Add Job Position
    </button>
  )

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Job Positions</h1>
      </header>

      <JobsStats stats={jobKpis} />

      <Card className="jobs-list-card">
        <CardHeader
          title="Job Positions List"
          subtitle={`${totalJobCount} Job Positions`}
          action={addJobButton}
        />

        <div className="jobs-list-content">
          <JobsFilter />
          <JobsTable jobs={jobPositions} />
        </div>
      </Card>
    </div>
  )
}
