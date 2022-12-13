import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';

// Hook for the theme --> && parsing an empty Object
const theme = createTheme({});

ReactDOM.render(
    // Store is our entire state and must me accessible to all components
    <Provider store={store}> 
        <ThemeProvider theme={theme}>
            <BrowserRouter >
                < App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>, 
    document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>)

