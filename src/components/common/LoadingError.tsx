import React, { CSSProperties } from 'react';

/**
 * Loading Spinner Props
 */
interface LoadingSpinnerProps {
    message?: string;
}

/**
 * Loading Spinner Component
 * Displays a loading indicator
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem'
    };

    const spinnerStyle: CSSProperties = {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const textStyle: CSSProperties = {
        color: '#666',
        fontSize: '14px'
    };

    return (
        <div style={containerStyle}>
            <div style={spinnerStyle} />
            <p style={textStyle}>{message}</p>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

/**
 * Error Message Props
 */
interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

/**
 * Error Message Component
 * Displays error messages with retry option
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    const containerStyle: CSSProperties = {
        padding: '1rem',
        margin: '1rem 0',
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        color: '#c33'
    };

    const titleStyle: CSSProperties = {
        margin: '0 0 0.5rem 0',
        fontWeight: 'bold'
    };

    const messageStyle: CSSProperties = {
        margin: '0 0 1rem 0'
    };

    const buttonStyle: CSSProperties = {
        padding: '0.5rem 1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <p style={titleStyle}>Error</p>
            <p style={messageStyle}>{message}</p>
            {onRetry && (
                <button onClick={onRetry} style={buttonStyle}>
                    Retry
                </button>
            )}
        </div>
    );
};
