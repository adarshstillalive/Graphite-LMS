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
  isApproved?: boolean;
  isPublished?: boolean;
  rating?: number;
  welcomeMessage?: string;
  courseCompletionMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chapters?: IChapter[];
}

class Course {
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
    public isApproved?: boolean,
    public isPublished?: boolean,
    public rating?: number,
    public welcomeMessage?: string,
    public courseCompletionMessage?: string,
    public chapters?: IChapter[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export default Course;
