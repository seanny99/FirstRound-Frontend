import React from 'react'
import { Search, Filter, Columns, RefreshCw, Download } from 'lucide-react'

interface JobsFilterProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    onRefresh?: () => void
}

export const JobsFilter: React.FC<JobsFilterProps> = ({ searchQuery, onSearchChange, onRefresh }) => {
    return (
        <div className="jobs-toolbar">
            <div className="jobs-search-wrap">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    className="jobs-search"
                    placeholder="Search by job title..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="jobs-toolbar-actions">
                <button type="button" className="btn btn-outline btn-toolbar">
                    <Filter className="w-4 h-4" />
                    <span>Advanced Filter</span>
                </button>
                <button type="button" className="btn btn-outline btn-toolbar">
                    <Columns className="w-4 h-4" />
                    <span>Column Setting</span>
                </button>
                <button type="button" className="btn btn-outline btn-toolbar" title="Refresh" onClick={onRefresh}>
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                </button>
                <button type="button" className="btn btn-outline btn-toolbar">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>
            </div>
        </div>
    )
}
