import React, { useState } from "react";
import styles from "./index.module.css";
import LinearProgress from '@mui/material/LinearProgress';

interface RoomImageProps {
    url: string;
  }

export function RoomImage(props: RoomImageProps){
    const [loaded, setLoaded] = useState(false);

    const imageFailHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) : void =>{
        event.currentTarget.src = './roomImagePlaceholder.png';
      }

    const handleLoad = () : void =>{
      setLoaded(true);
    }

    return(
      <div>
        <img
          src={props.url}
          className={styles.image}
          onError={imageFailHandler}
          onLoad={handleLoad}
        />
        {loaded === false ? <div className={styles.loadingContainer}><LinearProgress className={styles.loading}/> </div>: ""}
      </div>

    )
}