import React from 'react'
import { Card } from '@/components/ui/Card'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { SourcePanel } from '@/components/dashboard/SourcePanel'
import { SandboxActivity } from '@/components/dashboard/SandboxActivity'

export const Dashboard: React.FC = () => {
    const proactiveItems = [
        { name: 'AI Engineer', updated: 'Updated today', count: '100 candidates', showArrow: true },
        { name: 'XX', updated: 'Updated yesterday', count: '100 candidates', showArrow: true },
        { name: 'XX', updated: 'Updated by 02/01/2026', count: '100 candidates', showArrow: true },
        { name: 'XX', updated: 'Updated by 01/01/2026', count: '100 candidates', showArrow: true },
    ]

    const reactiveItems = [
        { name: 'AI Engineer', updated: 'Updated today', customContent: <span className="source-open">XX</span> },
    ]

    return (
        <div className="dashboard-page">
            <Card className="dashboard-container-card">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                </header>

                <DashboardStats />

                <div className="dashboard-source-row">
                    <SourcePanel
                        title="Proactive Source"
                        description="AI automates candidate pipeline from multiple sources. Zero-trust: every profile is verified before shortlist."
                        items={proactiveItems}
                    />
                    <SourcePanel
                        title="Reactive Source"
                        description="Candidates who submitted their resume through the hiring platforms or company website."
                        items={reactiveItems}
                    />
                </div>

                <div className="dashboard-sandbox-row">
                    <SandboxActivity />
                </div>
            </Card>
        </div>
    )
}
