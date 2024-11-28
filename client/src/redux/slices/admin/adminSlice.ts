import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/User';

interface adminState {
  currentAdmin: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: adminState = {
  currentAdmin: null,
  token: localStorage.getItem('adminToken'),
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCurrentAdmin: (state, action: PayloadAction<IUser | null>) => {
      state.currentAdmin = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('adminToken', action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLogout: (state) => {
      state.currentAdmin = null;
      state.token = null;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { setCurrentAdmin, setToken, setIsLoading, setError, setLogout } =
  adminSlice.actions;

export default adminSlice.reducer;
