import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container } from './styles/core.styles';
import Routes from '../routes';
import { store } from './configureStore';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>

                <Provider store={store}>
                    <Routes />
                </Provider>
            </Container>

        );
    }
}

Root.propTypes = {};

export default Root;
