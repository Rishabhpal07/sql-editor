import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import './SQLEditor.scss';

export default function SQLEditor({ value, onChange, onExecute, isLoading }) {
  const editorRef = useRef(null);

  const handleExecute = () => {
    if (editorRef.current) {
      const query = editorRef.current.getValue();
      if (query.trim()) {
        onExecute(query);
      }
    }
  };

  return (
    <div className="sql-editor-container">
      <div className="editor-header">
        <h3>SQL Editor</h3>
        <button
          className="primary btn-execute"
          onClick={handleExecute}
          disabled={isLoading || !value?.trim()}
        >
          {isLoading ? '⏳ Executing...' : '▶ Execute'}
        </button>
      </div>

      <div className="editor-wrapper">
        <Editor
          height="100vh"
          language="sql"
          value={value}
          onChange={onChange}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Courier New', monospace",
            lineNumbers: 'on',
            automaticLayout: true,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            tabSize: 5
          }}
        />
      </div>
    </div>
  );
}
