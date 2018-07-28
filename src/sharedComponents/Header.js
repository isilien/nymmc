import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css'

import mark from '../assets/images/mark.svg'

class Header extends Component {
    render () {
        return (
            <div className="nav">
                <div className={styles.header}>
                    <img className={styles.image} src={mark}/>
                        <Link className={styles.navLink} to="/">code-witch</Link> 
                        <Link className={styles.navLink} to="/resume">resume</Link> 
                        {/*<Link to="/blog">stories</Link>*/}
                </div>
                <div className={styles.divider}/>          
            </div>
        )
    }
}

export default Header;