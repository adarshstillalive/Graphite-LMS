import { Model, SortOrder } from 'mongoose';
import PaginatedResult from '../../../domain/entities/PaginatedResult.js';

type SortType = {
  [key: string]: SortOrder;
};

class MongoGenericRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getPaginated(
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isAdmin: false })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 });

    const total = await this.model.countDocuments({
      ...filter,
      isAdmin: false,
    });
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
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 });

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
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 })
      .populate('userId')
      .populate({
        path: 'courses.courseId',
        model: 'Course',
      });

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
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isApproved: false, isRejected: false })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 })
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments({
      ...filter,
      isApproved: false,
      isRejected: false,
    });
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
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isRejected: true })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 })
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments({
      ...filter,
      isRejected: true,
    });
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
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({ ...filter, isApproved: true, isRejected: false })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 })
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments({
      ...filter,
      isApproved: true,
      isRejected: false,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedCoursesWithPopulatedUserIdForHomePage(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
        isApproved: true,
        isRejected: false,
        isPublished: true,
      })
      .select('-chapters.episodes.content')
      .skip(skip)
      .limit(limit)
      .collation({ locale: 'en', strength: 2 })
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments({
      ...filter,
      isApproved: true,
      isRejected: false,
      isPublished: true,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async getPaginatedCoursesWithPopulatedUserIdForProductPage(
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    // const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
        isApproved: true,
        isRejected: false,
        isPublished: true,
      })
      .select('-chapters.episodes.content')
      .limit(limit * page)
      .sort(sort)
      .collation({ locale: 'en', strength: 2 })
      .populate('instructorId')
      .populate('category');

    const total = await this.model.countDocuments({
      ...filter,
      isApproved: true,
      isRejected: false,
      isPublished: true,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async getPaginatedOrders(
    userId: string,
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    // const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
        userId: userId,
      })
      .limit(limit * page)
      .sort(sort)
      .populate({
        path: 'courses.courseId',
        model: 'Course',
      });

    const total = await this.model.countDocuments({
      ...filter,
      userId: userId,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedReturnRequests(
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    // const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
        isApproved: false,
      })
      .limit(limit * page)
      .sort(sort)
      .populate('orderId')
      .populate('userId')
      .populate('itemId');

    const total = await this.model.countDocuments({
      ...filter,
      isApproved: false,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedAllOrders(
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    // const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
      })
      .limit(limit * page)
      .sort(sort)
      .populate('courses.courseId')
      .populate('userId');

    const total = await this.model.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async getPaginatedAllOrdersAdmin(
    page: number,
    limit: number,
    filter: object = {},
    sort: SortType,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const data = await this.model
      .find({
        ...filter,
      })
      .limit(limit * page)
      .skip(skip)
      .sort(sort)
      .populate('courses.courseId')
      .populate('userId');

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
