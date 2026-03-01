import React, { useState } from 'react';
import './SchemaViewer.scss';

export default function SchemaViewer({ schema }) {
  const [expandedTable, setExpandedTable] = useState(0);

  if (!schema || !schema.tables || schema.tables.length === 0) {
    return <div className="schema-viewer">No schema information available</div>;
  }

  const handleTableToggle = (index) => {
    setExpandedTable(expandedTable === index ? -1 : index);
  };

  return (
    <div className="schema-viewer">
      <h3>Table Schema</h3>
      <div className="tables-list">
        {schema.tables.map((table, idx) => (
          <div key={idx} className="table-section">
            <button
              className="table-header"
              onClick={() => handleTableToggle(idx)}
            >
              <span className="table-icon">
                {expandedTable === idx ? '▼' : '▶'}
              </span>
              <span className="table-name">{table.name}</span>
            </button>

            {expandedTable === idx && (
              <div className="columns-list">
                {table.columns.map((col, colIdx) => (
                  <div key={colIdx} className="column-item">
                    <div className="column-name">{col.name}</div>
                    <div className="column-type">{col.type}</div>
                    {col.description && (
                      <div className="column-description">{col.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
