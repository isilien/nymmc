import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css'

import mark from '../assets/images/mark.svg'

class Header extends Component {
    render () {
        return (
            <div>
            <div className={styles.header}>
                <div className={styles.image}>
                    <img src={mark}/>
                </div> 
                <Link to="/">code-witch</Link> 
                {/*<Link to="/blog">stories</Link>*/}
            </div>
            <div className={styles.divider}/>          
        </div>
        )
    }
}

export default Header;