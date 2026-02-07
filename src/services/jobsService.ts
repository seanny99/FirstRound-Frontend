import { apiFetch, API_ENDPOINTS } from '@/services/api';
import { transformToSnakeCase } from '@/utils/fieldTransform';
import type { JobDescription, JobDescriptionCreate } from '@/types/job';

/**
 * Jobs Service - TypeScript API service for job operations
 * All methods return promises that can be used with React hooks
 * Handles field transformation between frontend (camelCase) and backend (snake_case)
 */
export const jobsService = {
    /**
     * Fetch all job descriptions
     */
    async getAllJobs(): Promise<JobDescription[]> {
        try {
            const data = await apiFetch<JobDescription[]>(API_ENDPOINTS.jobs.getAll());
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    },

    /**
     * Fetch a single job description by ID
     */
    async getJobById(id: string): Promise<JobDescription> {
        try {
            const data = await apiFetch<JobDescription>(API_ENDPOINTS.jobs.getById(id));
            return data;
        } catch (error) {
            console.error('Error fetching job:', error);
            throw error;
        }
    },

    /**
     * Create a new job description
     */
    async createJob(jobData: JobDescriptionCreate): Promise<JobDescription> {
        try {
            // Transform camelCase to snake_case for backend
            const backendData = transformToSnakeCase(jobData);

            const data = await apiFetch<JobDescription>(API_ENDPOINTS.jobs.create(), {
                method: 'POST',
                body: JSON.stringify(backendData),
            });
            return data;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    },

    /**
     * Update an existing job description
     */
    async updateJob(id: string, jobData: JobDescriptionCreate): Promise<JobDescription> {
        try {
            // Transform camelCase to snake_case for backend
            const backendData = transformToSnakeCase(jobData);

            const data = await apiFetch<JobDescription>(API_ENDPOINTS.jobs.update(id), {
                method: 'PUT',
                body: JSON.stringify(backendData),
            });
            return data;
        } catch (error) {
            console.error('Error updating job:', error);
            throw error;
        }
    },

    /**
     * Delete a job description
     */
    async deleteJob(id: string): Promise<void> {
        try {
            await apiFetch(API_ENDPOINTS.jobs.delete(id), {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting job:', error);
            throw error;
        }
    },
};
