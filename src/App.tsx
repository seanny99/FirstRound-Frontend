import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { JobsProvider } from '@/context/JobsContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { setApiConfig } from '@/services/api';
import '@/css/App.css';

/**
 * Main App Component
 * Wraps the application with necessary providers and routing
 * Configures API connection to backend
 */
function App() {
    // Configure API connection to Flask backend
    useEffect(() => {
        setApiConfig({
            BASE_URL: 'http://localhost:5000/api',
            TIMEOUT: 10000,
        });
    }, []);

    return (
        <BrowserRouter>
            <JobsProvider>
                <AppRoutes />
            </JobsProvider>
        </BrowserRouter>
    );
}

export default App;
