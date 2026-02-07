import React from 'react'

export function CandidatesTable() {
    const candidates = [
        { id: 1, name: 'John Doe', source: 'Proactive', score: 94 },
        { id: 2, name: 'Alan Walker', source: 'Reactive', score: 89 },
        { id: 3, name: 'Jane Smith', source: 'Proactive', score: 85 },
        { id: 4, name: 'Emily Davis', source: 'Reactive', score: 92 },
        { id: 5, name: 'Michael Brown', source: 'Proactive', score: 78 },
    ]

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
                        <tr key={candidate.id}>
                            <td>
                                <div className="job-candidates-cell">
                                    <div className="job-candidate-avatar" style={{ backgroundImage: `url('https://i.pravatar.cc/150?u=${candidate.id}')` }}></div>
                                    <span className="candidate-name-link">{candidate.name}</span>
                                </div>
                            </td>
                            <td>
                                <span className={`source-pill pill-${candidate.source.toLowerCase()}`}>
                                    {candidate.source}
                                </span>
                            </td>
                            <td>
                                <div className="score-row">
                                    <div className="score-bar-container">
                                        <div className="score-bar-fill" style={{ width: `${candidate.score}%` }}></div>
                                    </div>
                                    <span className="score-text">{candidate.score}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
