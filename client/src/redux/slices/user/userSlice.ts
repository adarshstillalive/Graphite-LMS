import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/User';

interface UserState {
  currentUser: IUser | null;
  isInstructor: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isInstructor: false,
  token: localStorage.getItem('userToken'),
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setIsInstructor: (state, action: PayloadAction<boolean>) => {
      state.isInstructor = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLogout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('userToken');
    },
  },
});

export const {
  setCurrentUser,
  setIsInstructor,
  setToken,
  setIsLoading,
  setError,
  setLogout,
} = userSlice.actions;

export default userSlice.reducer;
