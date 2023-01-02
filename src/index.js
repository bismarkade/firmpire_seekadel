import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ToggleColorModeProvider from './utils/ToggleColorMode';
import App from './components/App';
import store from './app/store';
import './index.css' ; 

ReactDOM.render(
    // Store is our entire state and must me accessible to all components
    <Provider store={store}> 
        <ToggleColorModeProvider>
            <BrowserRouter >
                <App />
            </BrowserRouter>
        </ToggleColorModeProvider>
    </Provider>, 
    document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>)

