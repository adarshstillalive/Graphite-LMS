import mongoose from 'mongoose';

class InstructorRequest {
  constructor(
    public userId?: mongoose.Types.ObjectId,
    public expertise?: string[],
    public qualifications?: string[],
    public additionalInfo?: string[],
    public isApproved?: boolean,
    public isRejected?: boolean,
    public rejectedReason?: string | null,
    public rejectedAdmin?: mongoose.Types.ObjectId,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export default InstructorRequest;
