import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'

class Home extends Component {
    render() {
        return (
            <div className="homeContainer">
                <p>Welcome to 5-Minute Mission Control: an interactive exercise for <i>Not Your Mom's Mission Control</i>. 5MMC is about learning to spend your resources in an agile, scalable way while you work against the clock. Along the way you'll encounter some of the same challenges that we faced in creating the real Mission Control. Good luck and have fun!</p>
                
                <ul style={{listStyleType:"none"}}>
                    <li><Link className="btn btn-success" to="/level_1">Baby's First Launch</Link></li>
                    <li><button disabled><Link to="/level_2">Megalaunch</Link></button></li>
                    <li><button disabled><Link disabled to="/level_3">The Final Frontier</Link></button></li>
                </ul>

            </div>
        );
    }
}
export default Home;
