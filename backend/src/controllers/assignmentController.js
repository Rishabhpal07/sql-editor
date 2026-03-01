import { Assignment } from '../models/Assignment.js';

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .select('-solutionQuery -hintPrompt') 
      .sort({ difficulty: 1, createdAt: -1 });

    res.json({
      success: true,
      data: assignments
    });
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assignments'
    });
  }
};
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id)
      .select('-solutionQuery'); 

    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      data: assignment
    });
  } catch (err) {
    console.error('Error fetching assignment:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assignment'
    });
  }
};
