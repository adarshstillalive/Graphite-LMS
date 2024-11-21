import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    token: localStorage.getItem('userToken'),
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setToken, setIsLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;
