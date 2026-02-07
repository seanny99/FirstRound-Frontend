import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { InterviewCalendar } from '@/components/interviews/InterviewCalendar';
import { DailyAgenda } from '@/components/interviews/DailyAgenda';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const Interviews: React.FC = () => {
    const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Day'>('Month');

    return (
        <div className="dashboard-page">
            <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Interview Calendar</h1>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="view-mode-toggle">
                        <button
                            className={`toggle-btn ${viewMode === 'Month' ? 'active' : ''}`}
                            onClick={() => setViewMode('Month')}
                        >
                            Month
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'Week' ? 'active' : ''}`}
                            onClick={() => setViewMode('Week')}
                        >
                            Week
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'Day' ? 'active' : ''}`}
                            onClick={() => setViewMode('Day')}
                        >
                            Day
                        </button>
                    </div>

                    <div className="calendar-nav">
                        <button className="nav-btn"><ChevronLeft size={16} /></button>
                        <span className="current-month">February 2026</span>
                        <button className="nav-btn"><ChevronRight size={16} /></button>
                    </div>

                    <button className="btn-schedule-interview">
                        <Plus size={16} />
                        Schedule Interview
                    </button>
                </div>
            </header>

            <div className="interviews-grid">
                <div className="calendar-col">
                    <Card className="calendar-card">
                        <InterviewCalendar />
                    </Card>
                </div>
                <div className="agenda-col">
                    <Card className="agenda-card">
                        <DailyAgenda />
                    </Card>
                </div>
            </div>
        </div>
    );
};
