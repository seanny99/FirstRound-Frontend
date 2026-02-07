import React from 'react'

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

const proactiveItems = [
  { title: 'AI Engineer', updated: 'Updated today', meta: '100 candidates' },
  { title: 'XX', updated: 'Updated yesterday', meta: '100 candidates' },
  { title: 'XX', updated: 'Updated by 02/01/2026', meta: '100 candidates' },
  { title: 'XX', updated: 'Updated by 01/01/2026', meta: '100 candidates' },
]

const reactiveItems = [
  { title: 'AI Engineer', updated: 'Updated today', meta: 'XX' },
]

export function ProactiveSourcePanel() {
  return (
    <div className="source-panel">
      <h3 className="source-panel-title">Proactive Source</h3>
      <p className="source-panel-desc">
        AI automates candidate pipeline from multiple sources. Zero-trust: every profile is verified before shortlist.
      </p>
      <ul className="source-panel-list">
        {proactiveItems.map((item, i) => (
          <li key={i} className="source-panel-item">
            <div className="source-panel-item-content">
              <span className="source-panel-item-title">{item.title}</span>
              <span className="source-panel-item-updated">{item.updated}</span>
              <span className="source-panel-item-meta">{item.meta}</span>
            </div>
            <ChevronIcon />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ReactiveSourcePanel() {
  return (
    <div className="source-panel">
      <h3 className="source-panel-title">Reactive Source</h3>
      <p className="source-panel-desc">
        Candidates who submitted their resume through the hiring platforms or company website.
      </p>
      <ul className="source-panel-list">
        {reactiveItems.map((item, i) => (
          <li key={i} className="source-panel-item">
            <div className="source-panel-item-content">
              <span className="source-panel-item-title">{item.title}</span>
              <span className="source-panel-item-updated">{item.updated}</span>
              <span className="source-panel-item-meta">{item.meta}</span>
            </div>
            <ChevronIcon />
          </li>
        ))}
      </ul>
    </div>
  )
}
