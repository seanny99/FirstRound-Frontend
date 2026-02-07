import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard, Jobs, Candidates, Settings, JobPositionDetail, Interviews } from '@/pages';

/**
 * Application Routes Component
 * Defines all routes for the React application
 */
export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* Dashboard Routes */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Jobs Routes */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/new" element={<JobPositionDetail />} />
                <Route path="/jobs/:id" element={<JobPositionDetail />} />
                <Route path="/jobs/:id/edit" element={<JobPositionDetail />} />

                {/* Candidates Routes */}
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/candidates/:id" element={<div>Candidate Detail (Coming Soon)</div>} />

                {/* Interviews Routes */}
                <Route path="/interviews" element={<Interviews />} />

                {/* Settings Routes */}
                <Route path="/settings" element={<Settings />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};
