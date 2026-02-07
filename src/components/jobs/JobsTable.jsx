import React from 'react'

function AvatarPlaceholder() {
    return (
        <span className="job-candidate-avatar" title="Candidate" />
    )
}

export function JobsTable({ jobs }) {
    return (
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
    )
}
