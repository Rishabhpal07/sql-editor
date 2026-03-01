import React from 'react';
import { Link } from 'react-router-dom';
import './AssignmentCard.scss';

export default function AssignmentCard({ assignment }) {
  if (!assignment) return null;

  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty.toLowerCase()}`;
  };

  return (
    <Link
      to={`/assignment/${assignment._id}`}
      className="assignment-card"
    >
      <div className="card-header">
        <h3 className="card-title">{assignment.title}</h3>
        <span className={`difficulty-badge ${getDifficultyClass(assignment.difficulty)}`}>
          {assignment.difficulty.toUpperCase()}
        </span>
      </div>

      <p className="card-description">
        {assignment.description}
      </p>

      <div className="card-footer">
        <div className="tables-info">
          {assignment.databaseSchema?.tables && (
            <span className="table-count">
              📊 {assignment.databaseSchema.tables.length} table{assignment.databaseSchema.tables.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="card-action">
          <span className="arrow">→</span>
        </div>
      </div>
    </Link>
  );
}
