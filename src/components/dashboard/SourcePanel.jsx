import React from 'react'
import { ChevronRight } from 'lucide-react'

export function SourcePanel({ title, description, items }) {
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
