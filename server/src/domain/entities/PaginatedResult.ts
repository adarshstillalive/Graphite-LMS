class PaginatedResult<T> {
  constructor(
    public data: T[],
    public total: number,
    public page: number,
    public limit: number,
  ) {}
}

export default PaginatedResult;
