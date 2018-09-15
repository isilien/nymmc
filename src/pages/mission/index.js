import _ from 'underscore'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import { Container, Draggable } from 'react-smooth-dnd';


import MissionCountdown from './countdown';
import actionCreators from '../../modules/mission/actions'
import './index.css'
import ChallengeCard from './challengeCard'
const exampleChallengeCardData = require ('../../assets/exampleChallengeCardData.json')
import resourceCardDefs from '../../assets/resourceCardDefs.json'
import SimpleSortableList from './SimpleSortableList';
import './card.css'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

//TODO: make timer own component
class Mission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasStarted: false, 
            isPaused: true, 
            endTime: moment().add('1', 'm'),//endTime: moment(0,'ms')
            hand: [], //array of resource and event cards
            drawDeck: [], //stack of cards
            resourcesPile: [], //arr of strings
            discardPile: [], //stack of cards
            challengeDeck: exampleChallengeCardData,
            currentChallenge: [],
        }

        this.state.drawDeck = this.initialDeck(50);
        this.drawCards(5, this.state.drawDeck, this.state.hand);
        this.drawCards(2, this.state.challengeDeck, this.state.currentChallenge); //normally should be 1
    }

    initialDeck = (size) => {
        let deck = [];
        for(let i = 0; i < size; i++) {
            deck.push(resourceCardDefs[getRandomIntInclusive(0,2)]);
        }
        return deck;
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
    
    //from hand
    playResource = (card, handIndex) => {
        let resourceArray = this.state.resourcesPile;
        resourceArray.push(card.resource);

        let newHand = this.state.hand;
        newHand.splice(handIndex,1)

        this.drawCards(1, this.state.drawDeck, this.state.hand);

        this.setState({resourcesPile: resourceArray, hand: newHand})
    }

    //side FX
    drawCards = (amount, source, destination) => {
        for(let i = 0; i < amount; i++) {
            destination.push(source.pop());
        }
    }

    getRemainingRequirements = (requirements, current) => {
        const counts = _.countBy(requirements);
        const counts2 = _.countBy(current);

        const result = _.map(Object.keys(counts), cat=> {
            if(counts2[cat] === undefined) return requirements
            const remainingAmount = counts[cat] - (counts2[cat] || 0);
            let reconstructed = []
            for(let i =0; i<remainingAmount;i++){
                reconstructed.push(cat)
            }
            return reconstructed
        })
        return _.flatten(result);
    }

    render() {
        const { id } = this.props.match.params;
        const { 
            hasStarted,
            currentChallenge,
            isPaused,
            endTime,
            hand,
            drawDeck,
            resourcesPile,
            discardPile,
            challengeDeck,
        } = this.state;

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
                    <div className="currentChallenge row">
                        {_.map(currentChallenge, challenge => <ChallengeCard key={challenge.id} {...challenge}/>)}
                    </div>
                    <div className="playArea">
                            {currentChallenge && _.map(currentChallenge, challenge => {
                                
                                const challengeRequirements = this.getRemainingRequirements(challenge.requirements, resourcesPile);

                                return (
                                <div key={challenge.id} className="row requirements">
                                    <div className="col-12">Requirements</div>
                                    <Container
                                        orientation="horizontal"
                                        shouldAcceptDrop={(incoming, payload)=>incoming.groupName==="hand" && _.contains(challengeRequirements, payload.resource)}
                                    >
                                        {_.map(resourcesPile, (requirement, index) => {
                                            if(_.contains(challengeRequirements, resourcesPile[index])){
                                                return <Draggable className="resourceCard paid" key={index}> {requirement} </Draggable>
                                            }
                                        })}
                                        {_.map(challengeRequirements, (requirement, index) => {
                                            return <Draggable className="resourceCard" key={index}> {requirement} </Draggable>
                                        })}
                                    </Container>
                                </div>

                                )}
                            )}
                        <div className="row hand">
                            <div className="col-12">Hand</div>
                            <Container
                                className="col-12"
                                orientation="horizontal"
                                groupName="hand"
                                getChildPayload={foo=>hand[foo]}
                                onDrop={({payload, removedIndex})=>this.playResource(payload, removedIndex)}
                            >
                                {_.map(hand, (card, index) => {
                                    return <Draggable className="card" key={index}> {card.title} </Draggable>
                                })}
                            </Container>
                        </div>
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
