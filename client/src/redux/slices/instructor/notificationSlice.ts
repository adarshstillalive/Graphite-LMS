import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationSlice {
  uploadProgress: number;
}

const initialState: NotificationSlice = {
  uploadProgress: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { setUploadProgress } = notificationSlice.actions;

export default notificationSlice.reducer;
