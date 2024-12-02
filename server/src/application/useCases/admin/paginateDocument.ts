import PaginatedResult from '../../../domain/entities/PaginatedResult.js';
import BaseRepository from '../../../domain/repositories/BaseRepository.js';

class PaginateDocument<T> {
  constructor(private baseRepository: BaseRepository<T>) {}
  async execute(
    page: number,
    limit: number,
    filter: object = {},
  ): Promise<PaginatedResult<T>> {
    return await this.baseRepository.getPaginatedUser(page, limit, filter);
  }
}

export default PaginateDocument;
