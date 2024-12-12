import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  chapterId: string;
  episodeId: string;
  videoUrl: string;
  status: 'pending' | 'completed' | 'failed';
}

interface VideoUploadState {
  courseId: string | null;
  isCreating: boolean;
  uploads: UploadState[];
  isFormSubmitted: boolean;
}

const initialState: VideoUploadState = {
  courseId: null,
  isCreating: false,
  uploads: [],
  isFormSubmitted: false,
};

const courseCreationSlice = createSlice({
  name: 'courseCreation',
  initialState: initialState,
  reducers: {
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setAddUpload: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      const exists = state.uploads.some(
        (u) => u.chapterId === chapterId && u.episodeId === episodeId
      );
      if (!exists) {
        state.uploads.push({
          chapterId,
          episodeId,
          videoUrl: '',
          status: 'pending',
        });
      }
    },
    setRemoveUpload: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      state.uploads = state.uploads.filter(
        (upload) =>
          upload.chapterId !== chapterId && upload.episodeId !== episodeId
      );
    },
    setVideoUrl: (
      state,
      action: PayloadAction<{
        chapterId: string;
        episodeId: string;
        videoUrl: string;
      }>
    ) => {
      const { chapterId, episodeId, videoUrl } = action.payload;
      const upload = state.uploads.find(
        (u) => u.chapterId === chapterId && u.episodeId === episodeId
      );
      if (upload) {
        upload.videoUrl = videoUrl;
        upload.status = 'completed';
      }
    },
    setStatusFailed: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      const upload = state.uploads.find(
        (u) => u.chapterId === chapterId && u.episodeId === episodeId
      );
      if (upload) {
        upload.status = 'failed';
      }
    },
    setDeleteChapter: (state, action: PayloadAction<string>) => {
      state.uploads = state.uploads.filter(
        (u) => u.chapterId !== action.payload
      );
    },
    setDeleteEpisode: (state, action: PayloadAction<string>) => {
      state.uploads = state.uploads.filter(
        (u) => u.episodeId !== action.payload
      );
    },
    setIsFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
    setReset: (state) => {
      Object.assign(state, initialState);
    },
    setCourseId: (state, action: PayloadAction<string>) => {
      state.courseId = action.payload;
    },
  },
});

export const {
  setIsCreating,
  setAddUpload,
  setRemoveUpload,
  setVideoUrl,
  setStatusFailed,
  setDeleteChapter,
  setDeleteEpisode,
  setIsFormSubmitted,
  setReset,
  setCourseId,
} = courseCreationSlice.actions;

export default courseCreationSlice.reducer;
