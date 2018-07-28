import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css'

import mark from '../assets/images/mark.svg'

class Header extends Component {
    render () {
        return (
            <div className="nav">
                <img className="navbar-brand" src={mark}/>
                <div className={styles.header}>
                    <Link className="nav-link" to="/"><h2>code-witch</h2></Link> 
                    <Link className="nav-link" to="/resume"><h2>resume</h2></Link> 
                    {/*<Link to="/blog">stories</Link>*/}
                </div>
            <div className={styles.divider}/>          
        </div>
        )
    }
}

export default Header;