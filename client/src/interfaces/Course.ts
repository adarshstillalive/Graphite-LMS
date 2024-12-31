import { ICategory } from '@/services/admin/courseService';
import { IUser } from './User';

export interface IEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: string | { content: string } | null;
  _id?: string;
}

export interface IEpisodeCommon {
  id: string;
  title: string;
  type: string;
  description?: string;
}

export interface IChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IEpisode[];
  _id?: string;
}

export interface IChapterCommon {
  id: string;
  title: string;
  description?: string;
  episodes: IEpisodeCommon[];
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
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IChapter[];
  _id?: string;
}

export interface IPopulatedCourse {
  instructorId: IUser;
  title: string;
  subtitle: string;
  category: ICategory;
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
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IChapter[];
  _id?: string;
}

export interface IPopulatedCourseCommon {
  instructorId: IUser;
  title: string;
  subtitle: string;
  category: ICategory;
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
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IChapterCommon[];
  _id: string;
}
