import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './index.css'

class Mission extends Component {
    render() {

        const {id} = this.props.match.params;
        return (
            <div className="container">
                <div className="subheader">
                    <h2>Mission {id} <Link className="btn btn-success" to="/"><i className="fas fa-arrow-left"/> Back</Link></h2>
                    </div>
                <div className="missionContent">

                </div>
            </div>
        );
    }
}

export default Mission;
