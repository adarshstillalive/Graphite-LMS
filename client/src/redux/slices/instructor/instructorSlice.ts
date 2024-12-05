import { IInstructor } from '@/interfaces/Instructor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentInstructor: IInstructor | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentInstructor: null,
  isLoading: false,
  error: null,
};

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    setCurrentInstructor: (state, action: PayloadAction<IInstructor>) => {
      state.currentInstructor = {
        ...state.currentInstructor,
        ...action.payload,
      };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLogoutInstructor: (state) => {
      state.currentInstructor = null;
    },
  },
});

export const {
  setCurrentInstructor,
  setIsLoading,
  setError,
  setLogoutInstructor,
} = instructorSlice.actions;

export default instructorSlice.reducer;
