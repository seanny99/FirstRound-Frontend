import React from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { CandidatesStats } from '../components/candidates/CandidatesStats'
import { CandidatesTable } from '../components/candidates/CandidatesTable'
import { Button } from '../components/ui/Button'
import { Plus, Search, Filter, Columns, RefreshCw, Download, ChevronLeft, ChevronRight } from 'lucide-react'

export function Candidates() {
  const addCandidateButton = (
    <button type="button" className="btn-add-job-position">
      <span className="btn-add-job-plus">+</span>
      Add Candidate
    </button>
  )

  return (
    <div className="dashboard-page candidates-page">
      <header className="dashboard-header">
        <h1>Candidates</h1>
      </header>

      <CandidatesStats />

      <Card className="jobs-list-card">
        <CardHeader
          title="Candidates List"
          subtitle="100 Candidates"
          action={addCandidateButton}
        />

        <div className="jobs-list-content">
          <div className="jobs-toolbar">
            <div className="jobs-search-wrap">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" className="jobs-search" placeholder="Search" />
            </div>
            <div className="jobs-toolbar-actions">
              <button type="button" className="btn btn-outline btn-toolbar">
                <Filter className="w-4 h-4" />
                <span>Advanced Filter</span>
              </button>
              <button type="button" className="btn btn-outline btn-toolbar">
                <Columns className="w-4 h-4" />
                <span>Column Setting</span>
              </button>
              <button type="button" className="btn btn-outline btn-toolbar">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button type="button" className="btn btn-outline btn-toolbar">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <CandidatesTable />

          <div className="pagination-footer">
            <div className="pagination-info">
              <span className="pagination-dropdown">100 <ChevronItem /></span>
              <span className="pagination-text">Showing <b>1-5</b> of <b>100</b> records</span>
            </div>
            <div className="pagination-controls">
              <button className="page-btn page-btn-icon"><ChevronLeft size={16} /></button>
              <button className="page-btn page-btn-icon"><ChevronLeft size={12} /></button>
              <button className="page-btn page-active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn page-btn-icon"><ChevronRight size={12} /></button>
              <button className="page-btn page-btn-icon"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function ChevronItem() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
