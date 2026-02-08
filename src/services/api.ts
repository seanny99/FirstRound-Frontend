import { transformToCamelCase } from '@/utils/fieldTransform';
import type { ApiConfig, FetchOptions } from '@/types/job';

/**
 * API Configuration and Base Service
 * Configuration is set from App.tsx
 */

// API Base Configuration - will be set by App.tsx
export let API_CONFIG: ApiConfig = {
    BASE_URL: 'http://localhost:5000/api',
    TIMEOUT: 10000,
};

/**
 * Set API configuration (called from App.tsx)
 */
export const setApiConfig = (config: Partial<ApiConfig>): void => {
    API_CONFIG = { ...API_CONFIG, ...config };
};

/**
 * Base fetch wrapper with error handling and response transformation
 */
export const apiFetch = async <T = any>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Backend returns { status: "success", data: {...}, count: N }
        // Extract and transform the data
        if (result.data) {
            return transformToCamelCase<T>(result.data);
        }

        return transformToCamelCase<T>(result);
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
};

/**
 * API Endpoints Configuration
 */
export const API_ENDPOINTS = {
    jobs: {
        getAll: (): string => `${API_CONFIG.BASE_URL}/jobDescriptions`,
        getById: (id: string): string => `${API_CONFIG.BASE_URL}/jobDescriptions/${id}`,
        create: (): string => `${API_CONFIG.BASE_URL}/jobDescriptions`,
        update: (id: string): string => `${API_CONFIG.BASE_URL}/jobDescriptions/${id}`,
        delete: (id: string): string => `${API_CONFIG.BASE_URL}/jobDescriptions/${id}`,
        hire: (id: string): string => `${API_CONFIG.BASE_URL}/jobDescriptions/${id}/hire`,
    },
    candidates: {
        getAll: (): string => `${API_CONFIG.BASE_URL}/candidates`,
        getById: (id: string): string => `${API_CONFIG.BASE_URL}/candidates/${id}`,
    },
};
