import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import AssignmentCard from '../components/AssignmentCard';
import '../styles/AssignmentList.scss';

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // ✅ Stabilized function
  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.getAssignments();
      setAssignments(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // no dependencies

  // ✅ Proper effect
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filteredAssignments =
    selectedDifficulty === 'all'
      ? assignments
      : assignments.filter(
          (a) => a.difficulty === selectedDifficulty
        );

  return (
    <div className="assignment-list-page">
      <div className="page-header">
        <div className="header-content">
          <h1>SQL Practice Problems</h1>
          <p className="subtitle">
            Master SQL through hands-on practice
          </p>
        </div>
      </div>

      <div className="page-container">
        {/* Filter Section */}
        <div className="filter-section">
          <h3>Filter by Difficulty</h3>
          <div className="difficulty-filters">
            {['all', 'easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                className={`filter-btn ${
                  selectedDifficulty === level ? 'active' : ''
                }`}
                onClick={() => setSelectedDifficulty(level)}
              >
                {level === 'all'
                  ? 'All Problems'
                  : level.charAt(0).toUpperCase() +
                    level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <p>⏳ Loading</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-state">
            <p>Error: {error}</p>
            <button
              className="btn-retry"
              onClick={fetchAssignments}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          filteredAssignments.length === 0 && (
            <div className="empty-state">
              <p>📭 No assignments found</p>
            </div>
          )}

        {/* Assignments Grid */}
        {!loading &&
          !error &&
          filteredAssignments.length > 0 && (
            <>
              <div className="assignment-count">
                {filteredAssignments.length} problem
                {filteredAssignments.length !== 1
                  ? 's'
                  : ''}
              </div>

              <div className="assignments-grid">
                {filteredAssignments.map(
                  (assignment) => (
                    <AssignmentCard
                      key={assignment._id}
                      assignment={assignment}
                    />
                  )
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}