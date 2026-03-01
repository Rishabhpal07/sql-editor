/**
 * @param {string} query - SQL query to validate
 * @returns {boolean} Whether the query is safe
 */
export const isSafeQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return false;
  }
  const normalizedQuery = query.trim().toUpperCase();

  const blockedPatterns = [
    /^\s*DROP\s/i,
    /^\s*DELETE\s/i,
    /^\s*UPDATE\s/i,
    /^\s*INSERT\s/i,
    /^\s*ALTER\s/i,
    /^\s*TRUNCATE\s/i,
    /^\s*GRANT\s/i,
    /^\s*REVOKE\s/i,
    /^\s*CREATE\s/i,
    /^\s*REPLACE\s/i,
    /^\s*EXECUTE\s/i,
    /^\s*EXEC\s/i,
    /;\s*(DROP|DELETE|UPDATE|INSERT|ALTER|TRUNCATE|GRANT|REVOKE|CREATE)/i
  ];

  for (const pattern of blockedPatterns) {
    if (pattern.test(query)) {
      return false;
    }
  }

  if (!normalizedQuery.startsWith('SELECT') && !normalizedQuery.startsWith('WITH')) {
    return false;
  }

  return true;
};

/**
 * @param {string} query - SQL query
 * @returns {string} Error message
 */
export const getQueryValidationError = (query) => {
  if (!query || typeof query !== 'string') {
    return 'Query is empty or invalid';
  }

  const normalizedQuery = query.trim().toUpperCase();

  if (normalizedQuery.startsWith('DROP')) {
    return 'DROP operations are not allowed';
  }
  if (normalizedQuery.startsWith('DELETE')) {
    return 'DELETE operations are not allowed';
  }
  if (normalizedQuery.startsWith('UPDATE')) {
    return 'UPDATE operations are not allowed';
  }
  if (normalizedQuery.startsWith('INSERT')) {
    return 'INSERT operations are not allowed';
  }
  if (normalizedQuery.startsWith('ALTER')) {
    return 'ALTER operations are not allowed';
  }
  if (normalizedQuery.startsWith('TRUNCATE')) {
    return 'TRUNCATE operations are not allowed';
  }
  if (!normalizedQuery.startsWith('SELECT') && !normalizedQuery.startsWith('WITH')) {
    return 'Only SELECT queries are allowed';
  }

  return 'Query validation failed';
};
