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
const exampleChallengeCardData =require('../../assets/exampleChallengeCardData.json');
import resourceCardDefs from '../../assets/resourceCardDefs.json'
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

            bonusChallenge: null,
            bonusResourcePile: [],
        }
        this.state.drawDeck = this.initialDeck(50);
    }

    componentDidMount () {
        this.drawCards(5,'drawDeck', 'hand');
        this.drawNewChallenge();
    }

    initialDeck = (size) => {
        let deck = [];
        for (let i = 0; i < size; i++) {
            deck.push(resourceCardDefs[getRandomIntInclusive(0, 2)]);
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
    //side FX
    playResource = (card, handIndex) => {
        let resourceArray = this.state.resourcesPile;
        resourceArray.push(card.resource);

        let newHand = this.state.hand;
        newHand.splice(handIndex, 1)

        this.drawCards(1, 'drawDeck', 'hand');

        this.setState({ resourcesPile: resourceArray, hand: newHand })

        this.checkChallengeComplete();
    }

    //side FX
    drawCards = (amount, source, destination) => {
        let src = this.state[source];
        let dest = this.state[destination];

        if(src.length === 0) {
            console.error("Tried to draw from a source with 0 cards!",source, destination)
        }
        if(amount > src.length) amount = src.length;

        for (let i = 0; i < amount; i++) {
            dest.push(src.pop());
        }
        this.setState({[source] : src, [destination] : dest})
    }

    //side FX
    drawNewChallenge = () => {
        this.setState({currentChallenge: this.state.challengeDeck.pop()})
    }

    getRemainingRequirements = (requirements, current) => {
        const counts = _.countBy(requirements);
        const counts2 = _.countBy(current);

        const result = _.map(Object.keys(counts), cat => {
            const remainingAmount = counts[cat] - (counts2[cat] || 0);
            let reconstructed = []
            for (let i = 0; i < remainingAmount; i++) {
                reconstructed.push(cat)
            }
            return reconstructed
        })

        return _.flatten(result);
    }

    //side FX
    discardThenDraw = () => {
        this.drawCards(3, 'hand', 'discardPile')
        this.drawCards(3, 'drawDeck', 'hand')
    }

    selectedCard = (group, card, index) => {
        
    }

    checkChallengeComplete = () => {
        //TODO: show cool animation?
        const {currentChallenge, resourcesPile} = this.state;
        if(this.getRemainingRequirements(currentChallenge.requirements, resourcesPile).length === 0) {
            this.onChallengeComplete(currentChallenge);
        }
    }

    //side FX
    onChallengeComplete = (challenge) => {
        const {challengeDeck} = this.state;

        let result = _.filter(this.state.currentChallenge, curr => curr.id!==challenge.id);
        this.setState({currentChallenge : result, resourcesPile: []});

        if(result.length === 0) {
            //try to draw a card from the challenge deck
            if(challengeDeck.length === 0){
                console.log('you win!')
            }
        }
    }

    shouldAcceptDrop = (incoming, payload, challengeRequirements) => {
       return incoming.groupName === "hand" && _.contains(challengeRequirements, payload.resource)
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

        if(!currentChallenge) {
            return <div>Loading...</div>
        }

        const sortedHand = _.sortBy(hand,'title');
        const challengeRequirements = this.getRemainingRequirements(currentChallenge.requirements, resourcesPile);

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
                        {/* {!hasStarted ? <MissionCountdown startCountdown={this.startCountdown} /> :
                            <div>
                                <Countdown date={endTime.valueOf()} onComplete={this.onTimerEnd} />
                                <button className="btn btn-danger" onClick={() => { alert("Are you sure you want to quit?") }}><i className="fas fa-times" /> Quit</button>
                            </div>} */}
                    </div>
                    <div className="playArea">
                        <div className="row">
                            <button
                                className="challengeDeck card"
                                disabled={!(challengeRequirements.length === 0 && challengeDeck.length > 0)}
                                onClick={()=>{this.drawNewChallenge()}}
                            >
                                Challenge Deck
                            </button>
                            <ChallengeCard {...currentChallenge} />)
                            <Container
                                className="discardPile"
                                orientation="horizontal"
                                groupName="hand"
                            >
                                <div className="card"> 
                                    Discard Pile
                                </div>
                            </Container>
                        </div>
                        <div className="row requirementsArea">
                            <Container
                                orientation="horizontal"
                                shouldAcceptDrop={(incoming, payload) => this.shouldAcceptDrop(incoming, payload, challengeRequirements)}
                            >
                                {_.map(resourcesPile, (requirement, index) => {
                                        return <div className="card paid" key={index}> {requirement} </div>
                                })}  
                                {_.map(challengeRequirements, (requirement, index) => {
                                    return <div className="resourceCard card" key={index}> {requirement} </div>
                                })}
                            </Container>
                        </div>
                        <div className="row">
                            <Container
                                className="hand"
                                orientation="horizontal"
                                groupName="hand"
                                getChildPayload={foo => sortedHand[foo]}
                                onDrop={({ payload, removedIndex }) => this.playResource(payload, removedIndex)}
                            >
                                {_.map(sortedHand, (card, index) => {
                                    return (
                                        <Draggable 
                                            key={index}
                                            onClick={()=>{this.selectedCard("hand", card, index)}}
                                        > 
                                        <div className="card">{card.title} </div>
                                        </Draggable>
                                    )
                                })}
                            </Container>
                            <button 
                                className="btn"
                                disabled={drawDeck.length === 0}
                                onClick={this.discardThenDraw}
                            >
                            Discard 3, Draw 3
                            </button>
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
