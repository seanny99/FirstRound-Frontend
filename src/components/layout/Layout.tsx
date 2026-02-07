import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import '../../css/Layout.css'

export const Layout: React.FC = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    )
}
