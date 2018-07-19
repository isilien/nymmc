import "regenerator-runtime/runtime";
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import Root from './core/rootComponent';

// Render the app
const renderApp = Component => {

    render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./core/rootComponent.js', () => { render(Root) })
}