import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container">
                Welcome to <Link className="nav-link" to="/">code-witch.net!</Link> <br/> 
                This is where I put my various projects.
            </div>
        );
    }
}
export default Home;
