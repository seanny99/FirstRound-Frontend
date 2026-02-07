import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    rowsPerPage,
    totalRecords,
    onPageChange,
    onRowsPerPageChange,
}) => {
    const startRecord = (currentPage - 1) * rowsPerPage + 1;
    const endRecord = Math.min(currentPage * rowsPerPage, totalRecords);

    return (
        <div className="pagination-container">
            <div className="pagination-left">
                <div className="rows-per-row">
                    <div className="rows-select-wrapper">
                        <select
                            value={rowsPerPage}
                            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                            className="rows-select"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
                <span className="pagination-info">
                    Showing <strong>{startRecord}-{endRecord}</strong> of <strong>{totalRecords}</strong> records
                </span>
            </div>

            <div className="pagination-right">
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lsaquo;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Only show a few pages around the current page for simplicity in this example
                    if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                        return (
                            <button
                                key={pageNum}
                                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                onClick={() => onPageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    }
                    if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <span key={pageNum} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                })}

                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &rsaquo;
                </button>
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
};
