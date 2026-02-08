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
    const [searchQuery, setSearchQuery] = useState<string>('')

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
                count: job.availablePositions || 1, // Use available positions from API
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

    // Filter jobs based on search query (job title only)
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Calculate KPIs from filtered data
    const jobKpis = [
        { label: 'Open Job Positions', value: filteredJobs.length.toString() },
        { label: 'Active Positions', value: filteredJobs.filter(j => j.status === 'Active').length.toString() },
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

    const handleRefresh = () => {
        setSearchQuery('')
        fetchJobs()
    }

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
            <Card className="job-positions-card" style={{ marginBottom: '24px' }}>
                <header className="dashboard-header" style={{ marginBottom: '24px' }}>
                    <h1>Job Positions</h1>
                </header>

                <JobsStats stats={jobKpis} />
            </Card>

            {error && (
                <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
                    {error}
                </div>
            )}

            <Card className="jobs-list-card">
                <CardHeader
                    title="Job Positions List"
                    subtitle={`${filteredJobs.length} Job Position${filteredJobs.length !== 1 ? 's' : ''}`}
                    action={addJobButton}
                />

                <div className="jobs-list-content">
                    <JobsFilter
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onRefresh={handleRefresh}
                    />
                    <JobsTable jobs={filteredJobs} />
                </div>
            </Card>
        </div>
    )
}
