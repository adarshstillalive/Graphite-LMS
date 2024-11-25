import mongoose, { Schema, Document } from 'mongoose';

interface IInstructorRequest extends Document {
  userId: mongoose.Types.ObjectId;
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
  isApproved: boolean;
  isRejected: boolean;
  rejectedReason: string | null;
  rejectedAdmin?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const instructorRequestSchema: Schema<IInstructorRequest> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  expertise: {
    type: [String],
    default: [],
  },
  qualifications: {
    type: [String],
    default: [],
  },
  additionalInfo: {
    type: [String],
    default: [],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  rejectedReason: {
    type: String,
    default: null,
  },
  rejectedAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const InstructorRequestModel = mongoose.model<IInstructorRequest>(
  'InstructorRequest',
  instructorRequestSchema,
);

export default InstructorRequestModel;
