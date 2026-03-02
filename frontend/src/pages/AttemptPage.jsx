import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import SQLEditor from '../components/SQLEditor';
import SchemaViewer from '../components/SchemaViewer';
import DataPreviewTable from '../components/DataPreviewTable';
import ResultsTable from '../components/ResultsTable';
import '../styles/AttemptPage.scss';

export default function AttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [executeLoading, setExecuteLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  const [hint, setHint] = useState(null);
  const [hintLoading, setHintLoading] = useState(false);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAssignment(id);
      setAssignment(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (sql) => {
    try {
      setExecuteLoading(true);
      setError(null);
      setHint(null);
      setResult(null);

      const response = await api.executeQuery(sql, id);

      setResult({
        columns: response.data.columns,
        rows: response.data.rows,
        rowCount: response.data.rowCount
      });

      setExecutionTime(response.data.executionTime);
    } catch (err) {
      setError(err.message);
      setResult(null);
      setExecutionTime(null);
    } finally {
      setExecuteLoading(false);
    }
  };

  const handleGetHint = async () => {
    try {
      setHintLoading(true);
      setError(null);
      const response = await api.getHint(id, query);
      setHint(response.data.hint);
    } catch (err) {
      setError(err.message);
    } finally {
      setHintLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="attempt-page">
        <div className="loading-state">
          <p>⏳ Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="attempt-page">
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/')}>← Back to Assignments</button>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="attempt-page">
        <div className="error-state">
          <p>Assignment not found</p>
          <button onClick={() => navigate('/')}>← Back to Assignments</button>
        </div>
      </div>
    );
  }

  return (
    <div className="attempt-page">

      {/* HEADER */}
      <div className="attempt-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Back
        </button>

        <div className="header-title">
          <h1>{assignment.title}</h1>
          <span className={`difficulty-badge difficulty-${assignment.difficulty}`}>
            {assignment.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="attempt-container">

        {/* LEFT PANEL */}
        <div className="left-panel">

          <div className="question-section">
            <h2>Question</h2>
            <p>{assignment.question}</p>

            {assignment.description && (
              <div className="description-section">
                <h3>Description</h3>
                <p>{assignment.description}</p>
              </div>
            )}
          </div>

          <div className="schema-section">
            <SchemaViewer schema={assignment.databaseSchema} />
          </div>

          {assignment.sampleDataPreview && (
            <div className="preview-section">
              <DataPreviewTable data={assignment.sampleDataPreview} />
            </div>
          )}

          {(hint || hintLoading) && (
            <div className="hint-section">
              {hintLoading ? "Loading hint..." : hint}
            </div>
          )}

          {!hint && (
            <button className="btn-get-hint" onClick={handleGetHint}>
              {hintLoading ? "Loading..." : "💡 Get Hint"}
            </button>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <div className="sql-editor-container">
            <SQLEditor
              value={query}
              onChange={setQuery}
              onExecute={handleExecute}
              isLoading={executeLoading}
            />
          </div>

          <div className="results-container">
            <ResultsTable
              result={result}
              executionTime={executionTime}
              loading={executeLoading}
              error={error}
            />
          </div>

        </div>
      </div>
    </div>
  );
}