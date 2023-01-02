import React, { useState, createContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ( { children}) => {
    const [mode, setMode] = useState('light');

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    
    // will only change when mode changes
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);

  return (
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode} }>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;