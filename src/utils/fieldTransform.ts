/**
 * Field Transformation Utilities
 * Handles conversion between backend (snake_case) and frontend (camelCase)
 */

/**
 * Convert snake_case to camelCase
 */
export const snakeToCamel = (str: string): string => {
    return str.replace(/([-_][a-z])/gi, (match) => match.toUpperCase().replace(/[-_]/, ''));
};

/**
 * Convert camelCase to snake_case
 */
export const camelToSnake = (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

/**
 * Transform object keys from snake_case to camelCase
 */
export const transformToCamelCase = <T = any>(obj: any): T => {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => transformToCamelCase(item)) as T;
    }

    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelKey = snakeToCamel(key);
        transformed[camelKey] = typeof value === 'object' && value !== null
            ? transformToCamelCase(value)
            : value;
    }
    return transformed as T;
};

/**
 * Transform object keys from camelCase to snake_case
 */
export const transformToSnakeCase = <T = any>(obj: any): T => {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => transformToSnakeCase(item)) as T;
    }

    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = camelToSnake(key);
        transformed[snakeKey] = typeof value === 'object' && value !== null
            ? transformToSnakeCase(value)
            : value;
    }
    return transformed as T;
};
