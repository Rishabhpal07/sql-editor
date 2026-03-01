import React, { useState } from 'react';
import './ResultsTable.scss';

export default function ResultsTable({ result, executionTime, loading, error }) {
  const [sortConfig, setSortConfig] = useState(null);

  console.log('ResultsTable render:', { result, executionTime, loading, error });

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="results-panel loading">
        <div className="loading-spinner">⏳</div>
        <p>Executing query...</p>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="results-panel error">
        <div className="error-header">
          <h4>❌ Execution Error</h4>
        </div>
        <div className="error-content">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    console.log('Rendering empty state - no result');
    return (
      <div className="results-panel empty">
        <p>Execute a query to see results</p>
      </div>
    );
  }

  console.log('Rendering success state with result:', result);

  const { columns, rows, rowCount } = result;

  if (!columns || columns.length === 0) {
    return (
      <div className="results-panel empty">
        <p>Query executed successfully (0 columns)</p>
      </div>
    );
  }

  // Handle sorting
  const sortedRows = [...rows];
  if (sortConfig) {
    const { column, direction } = sortConfig;
    sortedRows.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal === null) return 1;
      if (bVal === null) return -1;

      if (typeof aVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }

  const handleSort = (column) => {
    setSortConfig((prev) => {
      if (prev?.column === column) {
        return {
          column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { column, direction: 'asc' };
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="results-panel success">
      <div className="results-header">
        <div className="results-info">
          <h4>Query Results</h4>
          <div className="execution-stats">
            <span className="stat">
              ⏱️ {executionTime}ms
            </span>
            <span className="stat separator">•</span>
            <span className="stat">
              📊 {rowCount} row{rowCount !== 1 ? 's' : ''}
            </span>
            <span className="stat separator">•</span>
            <span className="stat">
              🔗 {columns.length} column{columns.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="no-results">
          <p>Query executed successfully but returned no rows</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="sortable"
                    title="Click to sort"
                  >
                    <span className="column-name">{col}</span>
                    <span className="sort-icon">
                      {getSortIcon(col)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col) => (
                    <td key={`${rowIdx}-${col}`}>
                      {formatCellValue(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Copy Results Button */}
      <div className="results-footer">
        <button
          className="btn-copy"
          onClick={() => copyResultsToClipboard(columns, rows)}
          title="Copy as CSV"
        >
          📋 Copy CSV
        </button>
      </div>
    </div>
  );
}

/**
 * Format cell values for display
 */
function formatCellValue(value) {
  if (value === null || value === undefined) {
    return <span className="cell-null">NULL</span>;
  }

  if (typeof value === 'boolean') {
    return (
      <span className={`cell-bool ${value ? 'true' : 'false'}`}>
        {value ? 'true' : 'false'}
      </span>
    );
  }

  if (typeof value === 'number') {
    return <span className="cell-number">{value.toLocaleString()}</span>;
  }

  if (typeof value === 'string') {
    return <span className="cell-string">{value}</span>;
  }

  return <span className="cell-string">{JSON.stringify(value)}</span>;
}

/**
 * Copy results as CSV to clipboard
 */
function copyResultsToClipboard(columns, rows) {
  // Create CSV header
  const header = columns.map(col => `"${col}"`).join(',');

  // Create CSV rows
  const csvRows = rows.map(row =>
    columns.map(col => {
      const value = row[col];
      if (value === null || value === undefined) {
        return '""';
      }
      const str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    }).join(',')
  );

  const csv = [header, ...csvRows].join('\n');

  // Copy to clipboard
  navigator.clipboard.writeText(csv).then(() => {
    alert('Results copied to clipboard as CSV');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}
