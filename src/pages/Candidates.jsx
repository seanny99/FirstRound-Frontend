import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { CandidatesStats } from '../components/candidates/CandidatesStats'
import { CandidatesTable } from '../components/candidates/CandidatesTable'
import { CandidateDetailSlider } from '../components/candidates/CandidateDetailSlider'
import { Search, Filter, Columns, RefreshCw, Download, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_SIZES = [10, 50, 100]

export function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizeOpen, setPageSizeOpen] = useState(false)
  const pageSizeRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (pageSizeRef.current && !pageSizeRef.current.contains(e.target)) {
        setPageSizeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function fetchResumes() {
      try {
        const res = await fetch(`${API_BASE}/api/resumes`)
        if (!res.ok) throw new Error(res.statusText)
        const data = await res.json()
        if (!cancelled) setCandidates(data.resumes || [])
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load candidates')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchResumes()
    return () => { cancelled = true }
  }, [])

  const total = candidates.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const pageCandidates = candidates.slice(startIndex, endIndex)

  const handlePageSizeChange = (value) => {
    setPageSize(value)
    setPage(1)
    setPageSizeOpen(false)
  }

  const showPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages = []
    pages.push(1)
    const windowStart = Math.max(2, page - 1)
    const windowEnd = Math.min(totalPages - 1, page + 1)
    if (windowStart > 2) pages.push('...')
    for (let p = windowStart; p <= windowEnd; p++) pages.push(p)
    if (windowEnd < totalPages - 1) pages.push('...')
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  return (
    <div className="dashboard-page candidates-page">
      <header className="dashboard-header">
        <h1>Candidates</h1>
      </header>

      <CandidatesStats />

      <Card className="jobs-list-card">
        <CardHeader
          title="Candidates List"
          subtitle={loading ? 'Candidates' : total === 0 ? 'No candidates' : `${total} Candidate${total !== 1 ? 's' : ''}`}
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

          <div className="pagination-footer">
            <div className="pagination-info">
              <div className="page-size-dropdown" ref={pageSizeRef}>
                <button
                  type="button"
                  className="page-size-trigger"
                  onClick={() => setPageSizeOpen((o) => !o)}
                  aria-expanded={pageSizeOpen}
                  aria-haspopup="listbox"
                  aria-label="Records per page"
                >
                  <span className="page-size-value">{pageSize}</span>
                  <ChevronDown size={14} className="page-size-chevron" />
                </button>
                {pageSizeOpen && (
                  <ul
                    className="page-size-menu"
                    role="listbox"
                    aria-label="Records per page options"
                  >
                    {PAGE_SIZES.map((size) => (
                      <li key={size} role="option" aria-selected={pageSize === size}>
                        <button
                          type="button"
                          className={`page-size-option ${pageSize === size ? 'page-size-option-active' : ''}`}
                          onClick={() => handlePageSizeChange(size)}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="pagination-text">
                Showing <b>{total === 0 ? 0 : startIndex + 1}</b>-<b>{endIndex}</b> of <b>{total}</b> records
              </span>
            </div>
            <div className="pagination-controls">
              <button
                type="button"
                className="page-btn page-btn-icon"
                onClick={() => setPage(1)}
                disabled={page <= 1}
                aria-label="First page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="page-btn page-btn-icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={12} />
              </button>
              {showPageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="page-btn-ellipsis">…</span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    className={`page-btn ${page === p ? 'page-active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={page === p ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                className="page-btn page-btn-icon"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={12} />
              </button>
              <button
                type="button"
                className="page-btn page-btn-icon"
                onClick={() => setPage(totalPages)}
                disabled={page >= totalPages}
                aria-label="Last page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {selectedCandidate && (
        <CandidateDetailSlider
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  )
}
