import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './index.css'

class Tutorial extends Component {
    render() {
        return (
            <div className="container">
                <span><h2>Tutorial <Link className="btn btn-success" to="/"><i className="fas fa-arrow-left"/> Back</Link></h2></span>
                <ul>
                    <li>Press Start</li>
                    <li>timer counts down</li>
                    <li>drag resources from your hand into the correct slot</li>
                    <li>once all slots are filled, a new challenge will appear</li>
                    <li>Tip: use agile button if you get stuck</li>
                    <li>some cards can be actvated, either to draw more cards, defeat a challenge, etc</li>
                    <li>If time runs out before launch, you lose</li>
                </ul>
            </div>
        );
    }
}
export default Tutorial;
