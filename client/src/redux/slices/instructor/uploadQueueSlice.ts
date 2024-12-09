import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadQueueItem {
  fileName: string;
  fileSize: number;
  fileType: string;
  chapterIndex: number;
  episodeIndex: number;
  chapterId: string;
  episodeId: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  videoUrl?: string;
}

interface UploadQueueState {
  queue: UploadQueueItem[];
  isUploading: boolean;
}

const initialState: UploadQueueState = {
  queue: [],
  isUploading: false,
};

const uploadQueueSlice = createSlice({
  name: 'uploadQueue',
  initialState,
  reducers: {
    addToUploadQueue: (state, action: PayloadAction<UploadQueueItem>) => {
      state.queue.push(action.payload);
    },
    removeFromUploadQueue: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      state.queue = state.queue.filter(
        (item) =>
          !(item.chapterId === chapterId && item.episodeId === episodeId)
      );
    },
    updateUploadProgress: (
      state,
      action: PayloadAction<{
        chapterId: string;
        episodeId: string;
        progress: number;
      }>
    ) => {
      const item = state.queue.find(
        (item) =>
          item.chapterId === action.payload.chapterId &&
          item.episodeId === action.payload.episodeId
      );
      if (item) {
        item.progress = action.payload.progress;
        item.status = 'uploading';
      }
    },
    setUploadSuccess: (
      state,
      action: PayloadAction<{
        chapterId: string;
        episodeId: string;
        videoUrl: string;
      }>
    ) => {
      const item = state.queue.find(
        (item) =>
          item.chapterId === action.payload.chapterId &&
          item.episodeId === action.payload.episodeId
      );
      if (item) {
        item.status = 'completed';
        item.videoUrl = action.payload.videoUrl;
        item.progress = 100;
      }
    },
    setUploadFailed: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const item = state.queue.find(
        (item) =>
          item.chapterId === action.payload.chapterId &&
          item.episodeId === action.payload.episodeId
      );
      if (item) {
        item.status = 'failed';
      }
    },
    setResetQueue: (state) => {
      Object.assign(state, initialState);
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
  },
});

export const {
  addToUploadQueue,
  removeFromUploadQueue,
  updateUploadProgress,
  setUploadSuccess,
  setUploadFailed,
  setResetQueue,
  setIsUploading,
} = uploadQueueSlice.actions;

export default uploadQueueSlice.reducer;
