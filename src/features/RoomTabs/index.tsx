import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { roomInfo, selectedRoom, setSelectedRoom } from '../../screens/Rooms/slice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RoomInfoSanitized } from '../../common/models';
import RoomSummary from '../../common/components/RoomSummary';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) : JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) : object{
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RoomTabs() : JSX.Element {
  let roomsData = useAppSelector(roomInfo);
  let dispatch = useAppDispatch();
  let value : number = useAppSelector(selectedRoom);

  const handleChange = (event: React.SyntheticEvent, newValue: number) : void => {
    dispatch(setSelectedRoom(newValue));
  };

  const handleArrowClick = (forward: boolean) : void =>{
    let newIndex : number = value;
    if(forward)
      newIndex = value + 1;
    else
      newIndex = value - 1;
      
    if(newIndex < 0 || newIndex > roomsData.length - 1)
      return;

      dispatch(setSelectedRoom(newIndex));

  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderBottom: 1, borderColor: "divider"}}>
        <IconButton sx={{height: "25px"}} onClick={()=>handleArrowClick(false)}>
          <ArrowBackIosIcon sx={{height: "15px"}}  ></ArrowBackIosIcon>
        </IconButton>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {roomsData.map((roomInfo: RoomInfoSanitized, index: number) =>(
            <Tab key={index} label={roomInfo.room.roomName} {...a11yProps(index)} />
            ))}
        </Tabs>
        <IconButton sx={{height: "25px"}} onClick={()=>handleArrowClick(true)}>
          <ArrowForwardIosIcon sx={{height: "15px"}} ></ArrowForwardIosIcon>
        </IconButton>
      </Box>
      {roomsData.map((roomInfo: RoomInfoSanitized, index: number) =>(
          <TabPanel value={value} index={index} key={index}>
            <RoomSummary roomInfo={roomInfo} />
          </TabPanel>
      ))}
    </Box>
  );
}