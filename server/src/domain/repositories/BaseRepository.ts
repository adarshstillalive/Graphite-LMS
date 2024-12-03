import PaginatedResult from '../entities/PaginatedResult.js';

interface BaseRepository<T> {
  getPaginatedUser(
    page: number,
    limit: number,
    filter?: object,
  ): Promise<PaginatedResult<T>>;

  getPaginatedInstructor(
    page: number,
    limit: number,
    filter?: object,
  ): Promise<PaginatedResult<T>>;

  getPaginatedCategory(
    page: number,
    limit: number,
    filter?: object,
  ): Promise<PaginatedResult<T>>;
}

export default BaseRepository;
