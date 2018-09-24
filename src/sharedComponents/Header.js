import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render () {
        return (
            <div className="my-3">
                <h1>
                    <Link to="/">5-Minute Mission Control</Link>
                </h1>
                <hr/>
            </div>
        )
    }
}

export default Header;