import { Model } from 'mongoose';
import PaginatedResult from '../../../domain/entities/PaginatedResult.js';

class MongoGenericRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getPaginatedUser(
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

  async getPaginatedInstructor(
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

  async getPaginatedCategory(
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
}

export default MongoGenericRepository;
