import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import userReducer from './slices/user/userSlice';
import appReducer from './slices/user/appSlice';
import adminReducer from './slices/admin/adminSlice';
import instructorReducer from './slices/instructor/instructorSlice';
import courseCreationReducer from './slices/instructor/courseCreationSlice';
import uploadQueueReducer from './slices/instructor/uploadQueueSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  admin: adminReducer,
  instructor: instructorReducer,
  courseCreation: courseCreationReducer,
  uploadQueue: uploadQueueReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
