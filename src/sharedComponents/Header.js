import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render () {
        return (
            <div className="Header">
                <Link to="/">Code-Witch</Link> <Link to="/blog">Blog</Link>
            </div>
        )
    }
}

export default Header;