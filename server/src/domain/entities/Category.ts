export interface ISubCategory extends Document {
  name: string;
}

export interface ICategory extends Document {
  name: string;
  subCategory: ISubCategory[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class Category {
  constructor(
    public name: string,
    public subCategory: ISubCategory[],
  ) {}
}

export default Category;
