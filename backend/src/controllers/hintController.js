import { Assignment } from '../models/Assignment.js';
import { generateHint } from '../utils/llmService.js';

export const getHint = async (req, res) => {
  try {
    const { assignmentId, userQuery } = req.body;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        error: 'assignmentId is required'
      });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    const hint = await generateHint(
      assignment.title,
      assignment.description,
      assignment.question,
      assignment.databaseSchema, 
      assignment.hintPrompt,
      userQuery 
    );

    res.json({
      success: true,
      data: {
        hint,
        assignmentId,
        assignmentTitle: assignment.title
      }
    });
  } catch (err) {
    console.error('Hint generation error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to generate hint',
      details: err.message
    });
  }
};
