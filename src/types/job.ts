/**
 * TypeScript Type Definitions for Job Descriptions
 * Matches backend Python models
 */

/**
 * Job Description (camelCase - Frontend)
 */
export interface JobDescription {
    id?: string;
    _id?: string;
    jobTitle: string;
    roleOverview: string;
    responsibilities: string[];
    requiredSkills: string[];
    preferredSkills: string[];
    experienceLevel: string;
    salaryRangeDisplay: string;
    salaryRangeMin: number;
    salaryRangeMax: number;
    totalPositions?: number;
    availablePositions?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

/**
 * Job Description Create (for POST/PUT requests)
 */
export interface JobDescriptionCreate {
    jobTitle: string;
    roleOverview: string;
    responsibilities: string[];
    requiredSkills: string[];
    preferredSkills: string[];
    experienceLevel: string;
    salaryRangeDisplay: string;
    salaryRangeMin: number;
    salaryRangeMax: number;
    totalPositions?: number;
    availablePositions?: number;
}

/**
 * Backend API Response Format
 */
export interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    count?: number;
    message?: string;
}

/**
 * API Configuration
 */
export interface ApiConfig {
    BASE_URL: string;
    TIMEOUT: number;
}

/**
 * Fetch Options
 */
export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}
