import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GetRooms, RoomsDataForRedux } from '../../common/services/api';
import { RoomInfoSanitized } from '../../common/models';

export interface RoomState {
  roomInfo: Array<RoomInfoSanitized>;
  selectedRoom: number;
  requestStatus: 'initial' | 'inflight' | 'error' | 'success';
  showGuests: boolean;
}

const initialState: RoomState = {
  roomInfo: new Array<RoomInfoSanitized>,
  selectedRoom: 0,
  requestStatus: 'initial', 
  showGuests: false
};

export const fetchRoomData = createAsyncThunk(
  'rooms/fetchData',
  async (roomIds: Array<string>) => {
    const response = await GetRooms(roomIds);
    return response;
  }
);

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,

  reducers: {
    setRoomsData: (state, action: PayloadAction<RoomsDataForRedux>) => {
      state.roomInfo = action.payload.roomInfo;
    },
    setSelectedRoom: (state, action: PayloadAction<number>) =>{
      state.selectedRoom = action.payload;
    },
    toggleShowGuests: (state) =>{
      state.showGuests = !state.showGuests;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomData.pending, (state) => {
        state.requestStatus = 'inflight';
        state.roomInfo = new Array<RoomInfoSanitized>
      })
      .addCase(fetchRoomData.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.roomInfo = action.payload.roomInfo;
      })
      .addCase(fetchRoomData.rejected, (state) => {
        state.requestStatus = 'error';
      });
  },
});

export const { setSelectedRoom, toggleShowGuests } = roomsSlice.actions;

export const status = (state: RootState) => state.rooms.requestStatus;
export const roomInfo = (state: RootState) => state.rooms.roomInfo;
export const selectedRoom = (state: RootState) => state.rooms.selectedRoom;
export const showGuests = (state: RootState) => state.rooms.showGuests;

export default roomsSlice.reducer;
