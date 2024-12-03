import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../../../../domain/entities/Category.js';

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        name: String,
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;
