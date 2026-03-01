import React from 'react';
import './DataPreviewTable.scss';

export default function DataPreviewTable({ data }) {
  if (!data || !data.rows || data.rows.length === 0) {
    return (
      <div className="data-preview">
        <h4>Sample Data</h4>
        <p className="no-data">No data to display</p>
      </div>
    );
  }

  const { table, rows } = data;
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="data-preview">
      <h4>Sample Data from {table}</h4>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={`${idx}-${col}`}>
                    {formatValue(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="row-count">{rows.length} row{rows.length !== 1 ? 's' : ''} shown</p>
    </div>
  );
}

/**
 * Format cell values for display
 */
function formatValue(value) {
  if (value === null || value === undefined) {
    return <span className="null-value">NULL</span>;
  }

  if (typeof value === 'boolean') {
    return <span className={`bool-value ${value ? 'true' : 'false'}`}>
      {value ? 'true' : 'false'}
    </span>;
  }

  if (typeof value === 'number') {
    return <span className="number-value">{value}</span>;
  }

  if (typeof value === 'string') {
    return <span className="string-value">{value}</span>;
  }

  return String(value);
}
