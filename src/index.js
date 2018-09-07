import React from 'react';
import { render } from 'react-dom';
import Root from './core/rootComponent';
import './core/styles/index.css';

// Render the app
const renderApp = Component => {
    render(<Component/>,
        document.getElementById('root')
    );
};

renderApp(Root);
