import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';

// Hook for the theme --> && parsing an empty Object
const theme = createTheme({});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            < App />
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>)

