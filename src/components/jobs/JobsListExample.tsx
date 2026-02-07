import React, { CSSProperties } from 'react';
import { useJobsContext } from '../../context/JobsContext';
import { LoadingSpinner, ErrorMessage } from '../common/LoadingError';

/**
 * Example component demonstrating how to use the Jobs Context
 * This shows the TypeScript React pattern for consuming the jobs service
 * Works with backend data (fields automatically transformed from snake_case to camelCase)
 */
export const JobsListExample: React.FC = () => {
    const { jobs, loading, error, refreshJobs, deleteJob } = useJobsContext();

    // Handle delete with confirmation
    const handleDelete = async (jobId: string): Promise<void> => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await deleteJob(jobId);
                alert('Job deleted successfully!');
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                alert('Failed to delete job: ' + message);
            }
        }
    };

    // Show loading state
    if (loading && jobs.length === 0) {
        return <LoadingSpinner message="Loading jobs from backend..." />;
    }

    // Show error state
    if (error) {
        return <ErrorMessage message={error} onRetry={refreshJobs} />;
    }

    const headerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    };

    const buttonStyle: CSSProperties = {
        padding: '0.5rem 1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1
    };

    const emptyStyle: CSSProperties = {
        color: '#666',
        textAlign: 'center',
        padding: '2rem'
    };

    const gridStyle: CSSProperties = {
        display: 'grid',
        gap: '1rem'
    };

    const cardStyle: CSSProperties = {
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div className="jobs-list-example">
            <div style={headerStyle}>
                <h2>Jobs List ({jobs.length})</h2>
                <button onClick={refreshJobs} disabled={loading} style={buttonStyle}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {jobs.length === 0 ? (
                <p style={emptyStyle}>
                    No jobs found. Create your first job!
                </p>
            ) : (
                <div style={gridStyle}>
                    {jobs.map((job) => (
                        <div key={job.id || job._id} style={cardStyle}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                                {job.jobTitle}
                            </h3>
                            <p style={{ margin: '0 0 1rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                                {job.roleOverview}
                            </p>

                            <div style={{ marginBottom: '0.75rem' }}>
                                <strong style={{ color: '#34495e' }}>Experience Level:</strong>
                                <span style={{ marginLeft: '0.5rem', color: '#555' }}>
                                    {job.experienceLevel}
                                </span>
                            </div>

                            <div style={{ marginBottom: '0.75rem' }}>
                                <strong style={{ color: '#34495e' }}>Salary Range:</strong>
                                <span style={{ marginLeft: '0.5rem', color: '#555' }}>
                                    {job.salaryRangeDisplay}
                                </span>
                            </div>

                            {job.requiredSkills && job.requiredSkills.length > 0 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <strong style={{ color: '#34495e', display: 'block', marginBottom: '0.5rem' }}>
                                        Required Skills:
                                    </strong>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {job.requiredSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    backgroundColor: '#3498db',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button
                                    onClick={() => handleDelete(job.id || job._id || '')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
