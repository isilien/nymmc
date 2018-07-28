import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';
import { store } from './configureStore';
import styles from './styles/index.css'

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

Root.propTypes = {};

export default Root;
