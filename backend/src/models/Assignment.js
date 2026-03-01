import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    databaseSchema: {
      type: mongoose.Schema.Types.Mixed,
      default: { tables: [] }
    },
    sampleDataPreview: {
      type: mongoose.Schema.Types.Mixed,
      default: { table: '', rows: [] }
    },
    solutionQuery: {
      type: String,
      required: true
    },
    hintPrompt: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Assignment = mongoose.models.Assignment ||
  mongoose.model('Assignment', assignmentSchema);
