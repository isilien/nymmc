import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css'

class Home extends Component {
    render() {
        return (
            <div className={styles.homeContainer}>
                <p>Welcome to <Link className="nav-link" to="/">code-witch.net!</Link> <br/> </p>
                <p>This is where my various projects live.</p>
            </div>
        );
    }
}
export default Home;
