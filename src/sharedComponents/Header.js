import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css'

import mark from '../assets/images/mark.svg'

class Header extends Component {
    render () {
        return (
            <div className="nav">
            <div className={styles.header}>
                    <img className={styles.image  + " navbar-brand"} src={mark}/>
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