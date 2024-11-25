import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  role: 'user' | 'instructor';
}

const initialState: AppState = {
  role: 'user',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRole: (state) => {
      state.role = state.role === 'user' ? 'instructor' : 'user';
    },
  },
});

export const { setRole } = appSlice.actions;

export default appSlice.reducer;
