import mongoose, { Schema } from 'mongoose';

export interface IMongoEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: string;
}
export interface IMongoEpisodeCommon {
  id: string;
  title: string;
  type: string;
  description?: string;
}

export interface IMongoChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IMongoEpisode[];
}

export interface IMongoChapterCommon {
  id: string;
  title: string;
  description?: string;
  episodes: IMongoEpisodeCommon[];
}

export interface IMongoCourse {
  instructorId: mongoose.Schema.Types.ObjectId;
  title: string;
  subtitle: string;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: mongoose.Schema.Types.ObjectId;
  language: string;
  level: string;
  description: string;
  mrp: number;
  price: number;
  thumbnail: string;
  isApproved?: boolean;
  isRejected?: boolean;
  rejectedReason?: string;
  isPublished?: boolean;
  rating?: number;
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IMongoChapter[];
}

export interface IMongoCourseCommon {
  instructorId: mongoose.Schema.Types.ObjectId;
  title: string;
  subtitle: string;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: mongoose.Schema.Types.ObjectId;
  language: string;
  level: string;
  description: string;
  mrp: number;
  price: number;
  thumbnail: string;
  isApproved?: boolean;
  isRejected?: boolean;
  rejectedReason?: string;
  isPublished?: boolean;
  rating?: number;
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IMongoChapterCommon[];
}

const CourseSchema: Schema<IMongoCourse> = new Schema(
  {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
      index: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    rejectedReason: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    welcomeMessage: {
      type: String,
    },
    courseCompletionMessage: {
      type: String,
    },
    chapters: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        episodes: [
          {
            id: {
              type: String,
              required: true,
            },
            title: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              required: true,
            },
            description: {
              type: String,
            },
            content: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const CourseModel = mongoose.model<IMongoCourse>('Course', CourseSchema);

export default CourseModel;
