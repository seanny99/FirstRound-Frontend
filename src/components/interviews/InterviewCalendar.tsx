import React from 'react';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const InterviewCalendar: React.FC = () => {
    // Hardcoded February 2026 data
    const days = [
        { date: 29, currentMonth: false }, { date: 30, currentMonth: false }, { date: 31, currentMonth: false },
        { date: 1, currentMonth: true, interviews: [{ color: '#10B981', name: 'Justin C' }] },
        { date: 2, currentMonth: true }, { date: 3, currentMonth: true }, { date: 4, currentMonth: true },
        { date: 5, currentMonth: true }, { date: 6, currentMonth: true }, { date: 7, currentMonth: true },
        { date: 8, currentMonth: true },
        {
            date: 9, currentMonth: true, isToday: true, interviews: [
                { color: '#3B82F6', name: 'John Doe' },
                { color: '#F59E0B', name: 'David T' }
            ]
        },
        { date: 10, currentMonth: true }, { date: 11, currentMonth: true },
        { date: 12, currentMonth: true }, { date: 13, currentMonth: true }, { date: 14, currentMonth: true },
        { date: 15, currentMonth: true }, { date: 16, currentMonth: true }, { date: 17, currentMonth: true },
        { date: 18, currentMonth: true }, { date: 19, currentMonth: true }, { date: 20, currentMonth: true },
        { date: 21, currentMonth: true }, { date: 22, currentMonth: true }, { date: 23, currentMonth: true },
        { date: 24, currentMonth: true }, { date: 25, currentMonth: true }, { date: 26, currentMonth: true },
        { date: 27, currentMonth: true }, { date: 28, currentMonth: true },
        { date: 1, currentMonth: false }, { date: 2, currentMonth: false }, { date: 3, currentMonth: false },
        { date: 4, currentMonth: false }
    ];

    return (
        <div className="interview-calendar">
            <div className="calendar-week-days">
                {DAYS.map(day => <div key={day} className="week-day">{day}</div>)}
            </div>
            <div className="calendar-grid">
                {days.map((day, idx) => (
                    <div key={idx} className={`calendar-cell ${!day.currentMonth ? 'not-current' : ''}`}>
                        <div className={`cell-header ${day.isToday ? 'is-today' : ''}`}>
                            {day.date}
                        </div>
                        <div className="cell-interviews">
                            {day.interviews?.map((int, i) => (
                                <div key={i} className="interview-tick" style={{ borderLeftColor: int.color }}>
                                    {int.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
