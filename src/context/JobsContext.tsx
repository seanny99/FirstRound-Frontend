import React, { createContext, useContext, ReactNode } from 'react';
import { useJobs } from '@/hooks/useJobs';
import type { JobDescription, JobDescriptionCreate } from '@/types/job';

/**
 * Jobs Context Type
 */
interface JobsContextType {
    jobs: JobDescription[];
    loading: boolean;
    error: string | null;
    createJob: (jobData: JobDescriptionCreate) => Promise<JobDescription>;
    updateJob: (id: string, jobData: JobDescriptionCreate) => Promise<JobDescription>;
    deleteJob: (id: string) => Promise<void>;
    refreshJobs: () => void;
}

/**
 * Jobs Context - Provides global state management for jobs
 */
const JobsContext = createContext<JobsContextType | null>(null);

/**
 * Jobs Provider Props
 */
interface JobsProviderProps {
    children: ReactNode;
}

/**
 * Jobs Provider Component
 * Wraps the application to provide jobs state and operations
 */
export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
    const jobsState = useJobs();

    return (
        <JobsContext.Provider value={jobsState}>
            {children}
        </JobsContext.Provider>
    );
};

/**
 * Custom hook to use Jobs Context
 * @throws {Error} If used outside JobsProvider
 */
export const useJobsContext = (): JobsContextType => {
    const context = useContext(JobsContext);

    if (!context) {
        throw new Error('useJobsContext must be used within a JobsProvider');
    }

    return context;
};
