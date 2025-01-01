class PaginatedResult<T> {
  constructor(
    public data: T[],
    public total: number,
    public page: number,
    public limit: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public extra?: any,
  ) {}
}

export default PaginatedResult;
