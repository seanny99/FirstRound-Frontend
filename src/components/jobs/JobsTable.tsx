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
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalRecords = jobs.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
    const pageJobs = jobs.slice(startIndex, endIndex);

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
                        {pageJobs.map((job) => (
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
