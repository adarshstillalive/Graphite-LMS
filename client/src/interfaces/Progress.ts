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
