import { Model } from 'mongoose';
import PaginatedResult from '../../../domain/entities/PaginatedResult.js';

class MongoGenericRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getPaginated(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model.find(filter).skip(skip).limit(limit);

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedWithPopulatedUserId(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate('userId');

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedRequestWithPopulatedUserId(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isApproved: false, isRejected: false })
      .skip(skip)
      .limit(limit)
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedRejectedRequestWithPopulatedUserId(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isRejected: true })
      .skip(skip)
      .limit(limit)
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedCoursesWithPopulatedUserId(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isApproved: true, isRejected: false })
      .skip(skip)
      .limit(limit)
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }
}

export default MongoGenericRepository;
