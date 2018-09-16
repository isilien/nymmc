import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <p>Welcome to 5-Minute Mission Control: an interactive exercise for <i>Not Your Mom's Mission Control</i>. 5MMC is about learning to spend your resources in an agile, scalable way while you work against the clock. Along the way you'll encounter some of the same challenges that we faced in creating the real Mission Control. Good luck and have fun!</p>
                </div>
                <div className="col-6 mx-auto">
                    <Link className="btn btn-primary btn-block" to="/tutorial">Tutorial</Link>
                    <div className="btn-group-vertical btn-block my-3">
                        <Link className="btn btn-success" to="/mission/1">Baby's First Launch</Link>
                        <Link className="btn btn-secondary disabled" to="/mission/2">Megalaunch</Link>
                        <Link className="btn btn-secondary disabled" to="/mission/3">The Final Frontier</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;