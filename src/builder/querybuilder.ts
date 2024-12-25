import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  private cloneQuery() {
    return this.modelQuery.clone(); // Clone the query to avoid "Query was already executed" errors
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.cloneQuery().find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedKeys = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
    excludedKeys.forEach((key) => delete queryObj[key]);
  
    // Custom filter logic
    if (queryObj.filter) {
      queryObj._id = queryObj.filter; // Example: Using `filter` to match `_id`
      delete queryObj.filter;
    }
  
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
    paginate() {
    const page = Math.max(1, Number(this.query.page) || 1);
    const limit = Math.max(1, Number(this.query.limit) || 10);
    const skip = (page - 1) * limit;

    this.modelQuery = this.cloneQuery().skip(skip).limit(limit);
    return this;
  }

  sort() {
    let sortStr = '';
    if (this.query.sortBy && this.query.sortOrder) {
      const sortBy = this.query.sortBy as string;
      const sortOrder = this.query.sortOrder as string;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    if (sortStr) {
      this.modelQuery = this.cloneQuery().sort(sortStr);
    }
    return this;
  }

  select() {
    const fields = this.query.fields
      ? (this.query.fields as string).split(',').join(' ')
      : '-__v';

    this.modelQuery = this.cloneQuery().select(fields);
    return this;
  }
}

export default QueryBuilder;
