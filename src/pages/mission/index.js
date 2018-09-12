import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


import MissionCountdown from './countdown';
import actionCreators from '../../modules/mission/actions'
import './index.css'
import ChallengeCard from './challengeCard'
import data from '../../assets/exampleChallengeCardData.json'

//TODO: make timer own component
class Mission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasStarted: true, isPaused: true, endTime: moment().add('1', 'm')//endTime: moment(0,'ms')
        }
    }

    startCountdown = () => {
        this.setState({ hasStarted: true, isPaused: false, endTime: moment().add('1', 'm') })
    }

    startMission = () => {

    }

    onMissionPause = () => {
        this.setState({ isPaused: !this.state.isPaused })
    }

    onTimerEnd = () => {
        //you lose!
        //TODO: show game over modal
        console.log("You lose");
    }

    render() {
        const { id } = this.props.match.params;
        const { endTime, startTime, hasStarted, isPaused } = this.state;

        return (
            <div className="container">
                <div className="subheader">
                    <h2>Mission {id}</h2>
                </div>
                <div className="missionContent">
                    <div className="missionTimer">
                        {/* {<button className="btn btn-secondary" data-toggle="button" onClick={this.onMissionPause}>
                            <i className={`fas fa-${isPaused ? 'play' : 'pause'}`}/> 
                        </button>} */}
                        {!hasStarted ? <MissionCountdown startCountdown={this.startCountdown} /> :
                            <div>
                                <Countdown date={endTime.valueOf()} onComplete={this.onTimerEnd} />
                                <button className="btn btn-danger" onClick={()=>{alert("Are you sure you want to quit?")}}><i className="fas fa-times" /> Quit</button>
                            </div>}
                    </div>
                    <div className="playArea">
                        <div className="row challenges">
                            <Draggable><ChallengeCard {...data[0]}/></Draggable>
                        </div>
                        <div className="row requirements"></div>
                        <div className="row hand"></div>
                    </div>
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
