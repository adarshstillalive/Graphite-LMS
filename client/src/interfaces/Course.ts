import { ICategory } from '@/services/admin/courseService';
import { IUser } from './User';

export interface IEpisode {
  id: string;
  title: string;
  type: string;
  description?: string;
  content: string | { content: string } | null;
}

export interface IChapter {
  id: string;
  title: string;
  description?: string;
  episodes: IEpisode[];
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
