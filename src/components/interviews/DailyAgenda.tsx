import React from 'react';
import { Video } from 'lucide-react';

interface AgendaItem {
    id: string;
    time: string;
    name: string;
    role: string;
    stage: string;
    avatar: string;
}

export const DailyAgenda: React.FC = () => {
    const items: AgendaItem[] = [
        {
            id: '1',
            time: '9:00 AM',
            name: 'John Doe',
            role: 'AI Engineer',
            stage: '1st Round',
            avatar: 'https://i.pravatar.cc/150?u=1'
        },
        {
            id: '2',
            time: '11:00 AM',
            name: 'David Teo',
            role: 'Senior Software Engineer',
            stage: 'Final Round',
            avatar: 'https://i.pravatar.cc/150?u=2'
        },
    ];

    return (
        <div className="daily-agenda">
            <header className="agenda-header">
                <div>
                    <p className="agenda-label">DAILY AGENDA</p>
                    <h2 className="agenda-day">Thursday</h2>
                    <p className="agenda-date">09 February, 2026</p>
                </div>
                <div className="slots-badge">3 SLOTS LEFT</div>
            </header>

            <div className="agenda-list">
                {items.map(item => (
                    <div key={item.id} className="agenda-item">
                        <div className="item-time">
                            <span className="time-icon"></span>
                            {item.time}
                        </div>
                        <div className="item-card">
                            <div className="item-profile">
                                <img src={item.avatar} alt={item.name} className="item-avatar" />
                                <div>
                                    <h4 className="item-name">{item.name}</h4>
                                    <p className="item-role">{item.role}</p>
                                </div>
                            </div>
                            <div className="item-stage-badge">{item.stage}</div>
                            <button className="btn-start-call">
                                <Video size={16} />
                                Start Call
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
