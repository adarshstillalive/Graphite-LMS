import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  role: 'user' | 'instructor' | 'guest';
}

const initialState: AppState = {
  role: 'guest',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = appSlice.actions;

export default appSlice.reducer;
