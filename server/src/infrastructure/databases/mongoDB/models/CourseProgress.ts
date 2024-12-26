import mongoose, { Schema } from 'mongoose';

export interface IEpisodeProgress {
  episodeId: string;
  progress: number;
}

export interface IChapterProgress {
  chapterId: string;
  episodes: IEpisodeProgress[];
}

export interface ICourseProgress {
  userId: string;
  courseId: string;
  chapters: IChapterProgress[];
  totalProgress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMongoEpisodeProgress {
  episodeId: mongoose.Schema.Types.ObjectId;
  progress: number;
}

export interface IMongoChapterProgress {
  chapterId: mongoose.Schema.Types.ObjectId;
  episodes: IMongoEpisodeProgress[];
}

export interface IMongoCourseProgress {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  chapters: IMongoChapterProgress[];
  totalProgress: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseProgressSchema: Schema<IMongoCourseProgress> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    chapters: [
      {
        chapterId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        episodes: [
          {
            episodeId: {
              type: mongoose.Schema.Types.ObjectId,
            },
            progress: {
              type: Number,
            },
          },
        ],
      },
    ],
    totalProgress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const CourseProgressModel = mongoose.model<IMongoCourseProgress>(
  'CourseProgress',
  courseProgressSchema,
);

export default CourseProgressModel;
