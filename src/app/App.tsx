import React from 'react';
import './App.css';
import RoomsScreen from '../screens/Rooms';
import { StyledEngineProvider } from '@mui/material/styles';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#08839d",
    },
    info: {
      main: "#9d0884"
    }

  },
});

//this component should be reserved for theming wrappers & routing logic between screens in my experience
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <RoomsScreen />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
