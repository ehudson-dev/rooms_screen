import React from "react";
import Chip from '@mui/material/Chip';
import styles from './index.module.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

interface RoomChipsProps{
    remainingBalance: string,
    daysTillFinalPaymentDue: number,
    status: string
}

const statusText = (value: string) : "Booked" | "Processing" | "Cancelled" =>{
    switch(value){
        case "Active":
            return "Booked";
        case "Pending":
            return "Processing";
        case "Cancelled":
            return "Cancelled";
        default:
            return "Processing";
    }
}

const priceChipColor = (daysTillFinalPaymentDue: number, remainingBalance: number) : "warning" | "info" | "success" =>{

    if(daysTillFinalPaymentDue < 0 && remainingBalance > 0)
        return "warning";
    else if (remainingBalance > 0)
        return "info";
    return "success";
}

const statusColor = (status: string) : "success" | "info" | "warning" | "primary" =>{
    switch(status){
        case "Active":
            return "success";
        case "Pending":
            return "info";
        case "Cancelled":
            return "warning";
        default:
            return "primary";
    }
}

const paymentText = (daysTillFinalPaymentDue: number, remainingBalance: number) : string =>{
    if(daysTillFinalPaymentDue < 0 && remainingBalance > 0)
        return "Past Due - $"  + remainingBalance
    else if (remainingBalance > 0)
        return "Amount Due - $"  + remainingBalance
    else
        return "Paid in Full"
}

export function RoomChips(props: RoomChipsProps){
    return(
    <div className={styles.container}>
         <Chip icon={props.status === "Cancelled" ? <NotInterestedIcon/> : <CheckCircleOutlineIcon />} 
            label={statusText(props.status)} variant="outlined" 
            color={statusColor(props.status)} />
         <Chip icon={<PaidOutlinedIcon/>} 
            label={paymentText(props.daysTillFinalPaymentDue, parseFloat(props.remainingBalance))} 
            color={priceChipColor(props.daysTillFinalPaymentDue, parseFloat(props.remainingBalance))}
            variant="outlined" />
    </div>
    )
}