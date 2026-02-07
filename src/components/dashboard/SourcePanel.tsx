import React, { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface SourceItem {
    name: string
    updated: string
    count?: string
    showArrow?: boolean
    customContent?: ReactNode
}

interface SourcePanelProps {
    title: string
    description: string
    items: SourceItem[]
}

export const SourcePanel: React.FC<SourcePanelProps> = ({ title, description, items }) => {
    return (
        <div className="source-panel card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <p className="card-subtitle">{description}</p>
            </div>

            <div className="source-list">
                {items.map((item, index) => (
                    <div key={index} className="source-item">
                        <div className="source-item-content">
                            <span className="source-name">{item.name}</span>
                            <span className="source-update">{item.updated}</span>
                        </div>
                        <div className="source-item-right">
                            {item.count && <span className="source-count">{item.count}</span>}
                            {item.showArrow && <ChevronRight size={16} className="source-arrow" />}
                            {item.customContent}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
