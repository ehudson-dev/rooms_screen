import React from 'react';
import styles from './index.module.css';
import { Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RoomInfoSanitized } from '../../models';

interface RoomSummaryProps {
    roomInfo: RoomInfoSanitized
  }

export default function RoomSummary(props: RoomSummaryProps){

    return(
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.detailsContainer}>
                    <img src={'./doorIcon.png'} className={styles.doorIcon} />
                    <div className={styles.textContainer}>
                        <Typography variant='h6'>
                            {props.roomInfo.room.roomName}
                        </Typography>
                        <Typography className={styles.grey}>
                            {props.roomInfo.hotel.hotelName} - {props.roomInfo.room.roomType}
                        </Typography>
                        <Typography className={styles.grey}>
                            {props.roomInfo.room.travelStartDate} - {props.roomInfo.room.travelEndDate}
                        </Typography> 
                    </div>
                </div>
                <MoreVertIcon className={styles.vertIcon}></MoreVertIcon>
            </div>
        </div>
    )
}
