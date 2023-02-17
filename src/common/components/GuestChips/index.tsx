import React from "react";
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import styles from './index.module.css';
import { Traveler } from "../../models";
import { Typography } from "@mui/material";

interface GuestChipsProps{
    guests: Array<Traveler>
}

export function GuestChips(props: GuestChipsProps){
    return(
        <div className={styles.container}>
            <Typography variant="h6" className={styles.label}>
                Guests in this room
            </Typography>
            {props.guests.map((guest: Traveler, index: number)=>(
            <Chip size="medium" key={index} icon={<PersonIcon />} label={guest.firstName + ' ' + guest.lastName} variant="outlined" color="primary" />
            ))}
        </div>
    )
}