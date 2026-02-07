import React, { useState, useEffect } from 'react'
import { Card, CardHeader } from '@/components/ui/Card'
import { CandidatesStats } from '@/components/candidates/CandidatesStats'
import { CandidatesTable } from '@/components/candidates/CandidatesTable'
import { CandidateDetailSlider } from '@/components/candidates/CandidateDetailSlider'
import { Pagination } from '@/components/common/Pagination'
import { Search, Filter, Columns, RefreshCw, Download } from 'lucide-react'
import type { Resume } from '@/types/resume'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export const Candidates: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Resume | null>(null)
  const [candidates, setCandidates] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    let cancelled = false
    async function fetchResumes() {
      try {
        const res = await fetch(`${API_BASE}/api/resumes`)
        if (!res.ok) throw new Error(res.statusText)
        const data = await res.json()
        if (!cancelled) setCandidates(data.resumes ?? [])
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load candidates')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchResumes()
    return () => {
      cancelled = true
    }
  }, [])

  const total = candidates.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const pageCandidates = candidates.slice(startIndex, endIndex)

  const now = Date.now()
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000
  const newThisWeek = candidates.filter((c: Resume) => {
    const created = c.created_at ? new Date(c.created_at).getTime() : 0
    return created >= oneWeekAgo
  }).length
  const hasCreatedAt = candidates.some((c: Resume) => c.created_at != null)

  const handlePageSizeChange = (rows: number) => {
    setPageSize(rows)
    setPage(1)
  }

  return (
    <div className="dashboard-page candidates-page">
      <header className="dashboard-header">
        <h1>Candidates</h1>
      </header>

      <CandidatesStats
        total={total}
        newThisWeek={hasCreatedAt ? newThisWeek : undefined}
      />

      <Card className="jobs-list-card">
        <CardHeader
          title="Candidates List"
          subtitle={
            loading ? 'Candidates' : total === 0 ? 'No candidates' : `${total} Candidate${total !== 1 ? 's' : ''}`
          }
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

          <CandidatesTable
            candidates={pageCandidates}
            loading={loading}
            error={error}
            onSelectCandidate={setSelectedCandidate}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            rowsPerPage={pageSize}
            totalRecords={total}
            onPageChange={setPage}
            onRowsPerPageChange={handlePageSizeChange}
          />
        </div>
      </Card>

      {selectedCandidate && (
        <CandidateDetailSlider candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  )
}
