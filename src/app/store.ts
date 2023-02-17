import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomsReducer from '../screens/Rooms/slice';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
