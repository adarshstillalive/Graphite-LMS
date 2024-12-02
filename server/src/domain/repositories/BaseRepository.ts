import PaginatedResult from '../entities/PaginatedResult.js';

interface BaseRepository<T> {
  getPaginated(
    page: number,
    limit: number,
    filter?: object,
  ): Promise<PaginatedResult<T>>;
}

export default BaseRepository;
