
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomImage } from '../../common/components/RoomImage';
import RoomSummary from '../../common/components/RoomSummary';
import NavBar from '../../features/NavBar';
import RoomTabs from '../../features/RoomTabs';
import { RoomChips } from '../../common/components/RoomChips';
import  { fetchRoomData, status, roomInfo, selectedRoom, showGuests} from './slice';
import { Typography } from '@mui/material';
import { GuestChips } from '../../common/components/GuestChips';
import styles from './index.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { RoomControls } from '../../features/RoomControls';

function RoomsScreen() {

  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(status);
  const roomsData = useAppSelector(roomInfo);
  const roomIndex = useAppSelector(selectedRoom);
  const showGuestsTab = useAppSelector(showGuests);
  
  if(requestStatus === "initial")
    dispatch(fetchRoomData(["ceae0d77-2fd6-dbe3-0f33-61c355c106ff","4c0ad727-1652-3b6e-4adb-61c21a17a4b1"]));

  return (
    <div>
       <NavBar />
        {requestStatus === "success" ? 
          (
            <div>
              {roomsData.length > 1 ? <RoomTabs /> : <RoomSummary roomInfo={roomsData[roomIndex]} /> }
              <RoomImage url={roomsData[roomIndex].hotel.hotelImage} />
              <RoomChips daysTillFinalPaymentDue={roomsData[roomIndex].room.daysTillFinalPaymentDue} remainingBalance={roomsData[roomIndex].room.remainingBalance} status={roomsData[roomIndex].room.roomStatus} />
              <Typography className={styles.description}>Room Type Description from PTID Admin</Typography>
              <RoomControls />
              {showGuestsTab ? <GuestChips guests={roomsData[roomIndex].travelers}/> : ""}
            </div>
          ) : 
          (
            <div className={styles.loading}>
              <CircularProgress/>
            </div>
          )
        }
    </div>
  );
}

export default RoomsScreen;
