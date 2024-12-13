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
  notificationId?: string;
}

interface UploadQueueState {
  queue: UploadQueueItem[];
}

const initialState: UploadQueueState = {
  queue: [],
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
      state.queue = state.queue.filter(
        (item) =>
          !(
            item.chapterId === action.payload.chapterId &&
            item.episodeId === action.payload.episodeId
          )
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
      const { chapterId, episodeId, progress } = action.payload;
      const item = state.queue.find(
        (item) => item.chapterId === chapterId && item.episodeId === episodeId
      );
      if (item) {
        item.progress = progress;
      }
    },
    setUploadSuccess: (
      state,
      action: PayloadAction<{
        chapterId: string;
        episodeId: string;
      }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      const item = state.queue.find(
        (item) => item.chapterId === chapterId && item.episodeId === episodeId
      );
      if (item) {
        item.status = 'completed';
      }
    },
    setUploadFailed: (
      state,
      action: PayloadAction<{ chapterId: string; episodeId: string }>
    ) => {
      const { chapterId, episodeId } = action.payload;
      const item = state.queue.find(
        (item) => item.chapterId === chapterId && item.episodeId === episodeId
      );
      if (item) {
        item.status = 'failed';
      }
    },
    setNotificationId: (
      state,
      action: PayloadAction<{
        chapterId: string;
        episodeId: string;
        notificationId: string;
      }>
    ) => {
      const { chapterId, episodeId, notificationId } = action.payload;
      const item = state.queue.find(
        (item) => item.chapterId === chapterId && item.episodeId === episodeId
      );
      if (item) {
        item.notificationId = notificationId;
      }
    },
    setRestQueue: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addToUploadQueue,
  removeFromUploadQueue,
  updateUploadProgress,
  setUploadSuccess,
  setUploadFailed,
  setNotificationId,
  setRestQueue,
} = uploadQueueSlice.actions;

export default uploadQueueSlice.reducer;
