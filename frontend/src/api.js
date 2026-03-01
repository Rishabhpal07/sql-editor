const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const api = {
  getAssignments: async () => {
    const response = await fetch(`${API_URL}/assignments`);
    if (!response.ok) throw new Error('Failed to fetch assignments');
    return response.json();
  },

  getAssignment: async (id) => {
    const response = await fetch(`${API_URL}/assignments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch assignment');
    return response.json();
  },

  executeQuery: async (query, assignmentId) => {
    const response = await fetch(`${API_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, assignmentId })
    });
    if (!response.ok) throw new Error('Failed to execute query');
    return response.json();
  },

  getHint: async (assignmentId, userQuery) => {
    const response = await fetch(`${API_URL}/hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId, userQuery })
    });
    if (!response.ok) throw new Error('Failed to get hint');
    return response.json();
  }
};
