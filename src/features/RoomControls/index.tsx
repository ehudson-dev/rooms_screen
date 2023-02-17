import React from "react";
import styles from './index.module.css';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { showGuests, toggleShowGuests } from "../../screens/Rooms/slice";

export function RoomControls(): JSX.Element{

    const dispatch = useAppDispatch();
    const guestsEnabled = useAppSelector(showGuests);

    const handleToggle = (event: React.SyntheticEvent) : void => {
        dispatch(toggleShowGuests());
      };

    return(
    <div className={styles.controlsContainer}>
        <div className={styles.linksContainer}>
          <div className={styles.linkContainer}>
            <EditLocationAltIcon color="primary"></EditLocationAltIcon><Link underline='none' href="#">Modify</Link>
          </div>
          <div className={styles.linkContainer}>
            <MonetizationOnOutlinedIcon color='primary'></MonetizationOnOutlinedIcon><Link underline='none' href="#">Make Payment</Link>
          </div>
        </div>
        {guestsEnabled ? <IconButton onClick={handleToggle}><KeyboardArrowDownOutlinedIcon ></KeyboardArrowDownOutlinedIcon></IconButton> 
        : <IconButton onClick={handleToggle}><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></IconButton>}
      </div>
    )
}