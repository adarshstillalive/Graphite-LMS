import mongoose from 'mongoose';

export interface UploadState {
  chapterId: string;
  episodeId: string;
  videoUrl: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface IEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: string | { content: string } | null;
}

export interface IMongoEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: string | { content: string } | null;
  _id: mongoose.Schema.Types.ObjectId;
}

export interface IEditEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: { video: string } | { content: string } | null | unknown;
}

export interface IChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IEpisode[];
}

export interface IMongoChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IMongoEpisode[];
  _id: mongoose.Schema.Types.ObjectId;
}

export interface IEditChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IEditEpisode[];
}

export interface ICourse {
  instructorId: string;
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
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
  reviews?: string[];
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IChapter[];
}

export interface IEditCourse {
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  language: string;
  level: string;
  description: string;
  mrp: number;
  price: number;
  thumbnail: string;
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  chapters?: IEditChapter[];
}

class Course implements ICourse {
  constructor(
    public instructorId: string,
    public title: string,
    public subtitle: string,
    public category: string,
    public subcategory: string,
    public language: string,
    public level: string,
    public description: string,
    public mrp: number,
    public price: number,
    public thumbnail: string,
    public isApproved?: boolean,
    public isPublished?: boolean,
    public rating?: number,
    public welcomeMessage?: string,
    public courseCompletionMessage?: string,
    public chapters?: IChapter[],
    public reviews?: string[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export default Course;
