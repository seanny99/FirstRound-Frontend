import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader } from '@/components/ui/Card'
import { JobsStats } from '@/components/jobs/JobsStats'
import { JobsFilter } from '@/components/jobs/JobsFilter'
import { JobsTable } from '@/components/jobs/JobsTable'
import { jobsService } from '@/services/jobsService'

interface JobDisplay {
    id: string
    title: string
    status: string
    count: number | string
    timeline: string
    candidatesMore: number
    salary: string
    description: string
}

export const Jobs: React.FC = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState<JobDisplay[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch jobs from API
    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            setLoading(true)
            const data = await jobsService.getAllJobs()

            // Transform API data to match table format
            const transformedJobs: JobDisplay[] = data.map(job => ({
                id: (job.id || job._id || '').toString(),
                title: job.jobTitle,
                status: 'Active', // Default status
                count: 1, // Default count
                timeline: job.experienceLevel || 'N/A',
                candidatesMore: 0, // Default
                salary: job.salaryRangeDisplay,
                description: job.roleOverview,
            }))

            setJobs(transformedJobs)
            setError(null)
        } catch (err) {
            console.error('Failed to fetch jobs:', err)
            setError('Failed to load job positions. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Calculate KPIs from real data
    const jobKpis = [
        { label: 'Open Job Positions', value: jobs.length.toString() },
        { label: 'Active Positions', value: jobs.filter(j => j.status === 'Active').length.toString() },
        { label: 'Total Candidates', value: '0' }, // TODO: Implement when candidates API is ready
        { label: 'Successful Hires', value: '0' }, // TODO: Implement when hires tracking is ready
    ]

    const addJobButton = (
        <button
            type="button"
            className="btn-add-job-position"
            onClick={() => navigate('/jobs/new')}
        >
            <span className="btn-add-job-plus">+</span>
            Add Job Position
        </button>
    )

    if (loading) {
        return (
            <div className="dashboard-page">
                <header className="dashboard-header">
                    <h1>Job Positions</h1>
                </header>
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading job positions...</div>
            </div>
        )
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Job Positions</h1>
            </header>

            <JobsStats stats={jobKpis} />

            {error && (
                <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
                    {error}
                </div>
            )}

            <Card className="jobs-list-card">
                <CardHeader
                    title="Job Positions List"
                    subtitle={`${jobs.length} Job Positions`}
                    action={addJobButton}
                />

                <div className="jobs-list-content">
                    <JobsFilter />
                    <JobsTable jobs={jobs} />
                </div>
            </Card>
        </div>
    )
}
