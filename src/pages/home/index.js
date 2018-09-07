import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'
class Home extends Component {
    render() {
        return (
            <div className="homeContainer">
                Welcome to the home page.
                <ul style={{listStyleType:"none"}}>
                    <li><button><Link to="/level_1">Baby's First Launch</Link></button></li>
                    <li><button><Link to="/level_2">Megalaunch</Link></button></li>
                    <li><button><Link to="/level_3">The Final Frontier</Link></button></li>
                </ul>
            </div>
        );
    }
}
export default Home;
