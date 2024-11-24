import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  user: 'user' | 'instructor';
}

const initialState: AppState = {
  user: 'user',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = state.user === 'user' ? 'instructor' : 'user';
    },
  },
});

export const { setUser } = appSlice.actions;

export default appSlice.reducer;
