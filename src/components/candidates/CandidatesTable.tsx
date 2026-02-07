import React from 'react'
import type { Resume } from '@/types/resume'

interface CandidatesTableProps {
  candidates?: Resume[]
  loading?: boolean
  error?: string | null
  onSelectCandidate?: (candidate: Resume) => void
}

export function CandidatesTable({ candidates = [], loading, error, onSelectCandidate }: CandidatesTableProps) {
    if (loading) {
        return (
            <div className="table-wrap">
                <p className="text-slate-500">Loading candidates…</p>
            </div>
        )
    }
    if (error) {
        return (
            <div className="table-wrap">
                <p className="text-red-500">Error: {error}</p>
            </div>
        )
    }

    return (
        <div className="table-wrap">
            <table className="jobs-table candidates-table">
                <thead>
                    <tr>
                        <th>CANDIDATE</th>
                        <th>SOURCE TYPE</th>
                        <th>SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate._id}>
                            <td>
                                <div className="job-candidates-cell">
                                    <div className="job-candidate-avatar job-candidate-avatar-initials">
                                        {(candidate.full_name || '?')
                                            .split(/\s+/)
                                            .map((n) => n[0])
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase() || '?'}
                                    </div>
                                    <button
                                        type="button"
                                        className="candidate-name-link"
                                        onClick={() => onSelectCandidate?.(candidate)}
                                    >
                                        {candidate.full_name}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <span className="source-pill pill-reactive">
                                    {candidate.target_role || '—'}
                                </span>
                            </td>
                            <td>
                                <div className="score-row">
                                    <div className="score-bar-container">
                                        <div
                                            className="score-bar-fill"
                                            style={{
                                                width: `${(candidate.skills?.length || 0) * 5}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="score-text">
                                        {candidate.skills?.length ? (candidate.skills.length * 5) : '—'}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
