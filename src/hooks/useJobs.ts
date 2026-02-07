import { useState, useEffect, useCallback } from 'react';
import { jobsService } from '@/services/jobsService';
import type { JobDescription, JobDescriptionCreate } from '@/types/job';

/**
 * Jobs Hook Return Type
 */
interface UseJobsReturn {
    jobs: JobDescription[];
    loading: boolean;
    error: string | null;
    createJob: (jobData: JobDescriptionCreate) => Promise<JobDescription>;
    updateJob: (id: string, jobData: JobDescriptionCreate) => Promise<JobDescription>;
    deleteJob: (id: string) => Promise<void>;
    refreshJobs: () => void;
}

/**
 * Custom hook for managing jobs data
 * Provides CRUD operations with loading and error states
 */
export const useJobs = (): UseJobsReturn => {
    const [jobs, setJobs] = useState<JobDescription[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all jobs
     */
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await jobsService.getAllJobs();
            setJobs(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.error('Failed to fetch jobs:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new job
     */
    const createJob = useCallback(async (jobData: JobDescriptionCreate): Promise<JobDescription> => {
        setLoading(true);
        setError(null);
        try {
            const newJob = await jobsService.createJob(jobData);
            setJobs(prev => [...prev, newJob]);
            return newJob;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.error('Failed to create job:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing job
     */
    const updateJob = useCallback(async (id: string, jobData: JobDescriptionCreate): Promise<JobDescription> => {
        setLoading(true);
        setError(null);
        try {
            const updatedJob = await jobsService.updateJob(id, jobData);
            setJobs(prev => prev.map(job =>
                (job.id === id || job._id === id) ? updatedJob : job
            ));
            return updatedJob;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.error('Failed to update job:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a job
     */
    const deleteJob = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await jobsService.deleteJob(id);
            setJobs(prev => prev.filter(job => job.id !== id && job._id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.error('Failed to delete job:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Refresh jobs data
     */
    const refreshJobs = useCallback(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Auto-fetch on mount
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return {
        jobs,
        loading,
        error,
        createJob,
        updateJob,
        deleteJob,
        refreshJobs,
    };
};

/**
 * Single Job Hook Return Type
 */
interface UseJobReturn {
    job: JobDescription | null;
    loading: boolean;
    error: string | null;
    refreshJob: () => void;
}

/**
 * Custom hook for managing a single job
 */
export const useJob = (jobId: string | undefined): UseJobReturn => {
    const [job, setJob] = useState<JobDescription | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchJob = useCallback(async () => {
        if (!jobId) return;

        setLoading(true);
        setError(null);
        try {
            const data = await jobsService.getJobById(jobId);
            setJob(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.error('Failed to fetch job:', err);
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    useEffect(() => {
        fetchJob();
    }, [fetchJob]);

    return {
        job,
        loading,
        error,
        refreshJob: fetchJob,
    };
};
