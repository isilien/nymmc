import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom';
import './index.css'

import Countdown from './countdown';
import actionCreators from '../../modules/mission/actions'


class Mission extends Component {

    constructor(props){
        super(props);
        this.state = {
            hasStarted : false
        }
    }

    startCountdown = () => {
        this.setState({hasStarted: true})
    }

    startMission = () => {

    }

    onMissionPause = () => {

    }

    onTimerEnd = () => {
        //you lose
    }

    render() {

        const {id} = this.props.match.params;
        const {hasStarted} = this.state;
        return (
            <div className="container">
                <div className="subheader">
                    <h2>Mission {id} <Link className="btn btn-success" to="/"><i className="fas fa-arrow-left"/> Back</Link></h2>
                    </div>
                <div className="missionContent">
                    {!hasStarted && <Countdown startCountdown={this.startCountdown}/> }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        followUser: (id, following) => {
            dispatch(actionCreators.followAuthor(id, following))
        },
        fetchAuthorInfo: screenName => {
            dispatch(actionCreators.fetchAuthorInfo(screenName))
        }
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Mission);
