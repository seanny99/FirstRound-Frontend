import React, { useState } from 'react'
import { Pagination } from '../common/Pagination'

interface Job {
    id: string
    title: string
    status: string
    count: number | string
    timeline: string
    candidatesMore: number
}

interface JobsTableProps {
    jobs: Job[]
}

const AvatarPlaceholder: React.FC = () => {
    return (
        <span className="job-candidate-avatar" title="Candidate" />
    )
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const totalRecords = 100; // Hardcoded to match Figma screenshot example
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    return (
        <div className="jobs-table-footer-wrap">
            <div className="table-wrap">
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Job Position</th>
                            <th>Status</th>
                            <th>Count</th>
                            <th>Timeline</th>
                            <th>Candidates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <a href="#" className="job-position-link">{job.title}</a>
                                </td>
                                <td>
                                    <span className={`job-status-pill ${job.status === 'Active' ? 'job-status-active' : ''}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>
                                    <span className="job-count">{job.count}</span>
                                </td>
                                <td>{job.timeline}</td>
                                <td>
                                    <div className="job-candidates-cell">
                                        {[...Array(4)].map((_, i) => (
                                            <AvatarPlaceholder key={i} />
                                        ))}
                                        <span className="job-candidates-more">+{job.candidatesMore}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRecords={totalRecords}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={(rows) => {
                    setRowsPerPage(rows);
                    setCurrentPage(1);
                }}
            />
        </div>
    )
}
