import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    userQuery: {
      type: String,
      required: true
    },
    isSuccess: {
      type: Boolean,
      default: false
    },
    result: {
      columns: [String],
      rows: [mongoose.Schema.Types.Mixed]
    },
    error: {
      type: String
    },
    executionTime: {
      type: Number,
      description: 'Execution time in milliseconds'
    }
  },
  { timestamps: true }
);

export const Attempt = mongoose.models.Attempt ||
  mongoose.model('Attempt', attemptSchema);
