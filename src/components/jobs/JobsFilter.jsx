import React from 'react'
import { Search, Filter, Columns, RefreshCw, Download } from 'lucide-react'

export function JobsFilter() {
    return (
        <div className="jobs-toolbar">
            <div className="jobs-search-wrap">
                <Search className="w-4 h-4 text-slate-400" />
                <input type="text" className="jobs-search" placeholder="Search" />
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
                <button type="button" className="btn btn-outline btn-toolbar" title="Refresh">
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
