import { executePostgresQuery } from '../db/postgres.js';
import { Attempt } from '../models/Attempt.js';
import { isSafeQuery, getQueryValidationError } from '../utils/sqlValidator.js';

export const executeQuery = async (req, res) => {
  try {
    const { query, assignmentId } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query is required and must be a string'
      });
    }

    if (!isSafeQuery(query)) {
      const errorMessage = getQueryValidationError(query);
      return res.status(400).json({
        success: false,
        error: errorMessage,
        details: 'Only SELECT queries are allowed. DROP, DELETE, UPDATE, INSERT, ALTER are blocked.'
      });
    }

    const startTime = Date.now();
    const result = await executePostgresQuery(query);
    const executionTime = Date.now() - startTime;

    const columns = result.fields.map(field => field.name);
    const rows = result.rows;

    if (assignmentId) {
      try {
        await Attempt.create({
          assignmentId,
          userQuery: query,
          isSuccess: true,
          result: { columns, rows },
          executionTime
        });
      } catch (err) {
        console.warn('Failed to save attempt:', err.message);
      }
    }

    res.json({
      success: true,
      data: {
        columns,
        rows,
        rowCount: rows.length,
        executionTime
      }
    });
  } catch (err) {
    console.error('Query execution error:', err);

    const { query, assignmentId } = req.body;
    if (assignmentId) {
      try {
        await Attempt.create({
          assignmentId,
          userQuery: query,
          isSuccess: false,
          error: err.message
        });
      } catch (saveErr) {
        console.warn('Failed to save failed attempt:', saveErr.message);
      }
    }

    res.status(400).json({
      success: false,
      error: 'Query execution failed',
      details: err.message
    });
  }
};
