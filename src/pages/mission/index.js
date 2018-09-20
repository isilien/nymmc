import _ from 'underscore'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import { Container, Draggable } from 'react-smooth-dnd';
import Timer from './timer';

import MissionCountdown from './countdown';
import actionCreators from '../../modules/mission/actions'
import './index.css'
import ChallengeCard from './challengeCard'
const exampleChallengeCardData =require('../../assets/exampleChallengeCardData.json');
import resourceCardDefs from '../../assets/resourceCardDefs.json'
import './card.css'

import devImgSrc from '../../assets/images/api.png'
import UXImgSrc from '../../assets/images/ux.png'
import opsImgSrc from '../../assets/images/ops.png'

function getResourceImg (resource) {
    switch(resource) {
        case 'UX':
            return UXImgSrc;
        case 'ops':
            return opsImgSrc;
        case 'dev':
            return devImgSrc;
    }
}

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
            isPaused: false,

            hand: [], //array of resource and event cards
            drawDeck: [], //stack of cards
            resourcesPile: [], //arr of strings
            discardPile: [], //stack of cards
            challengeDeck: exampleChallengeCardData,
            currentChallenge: null,
            showVictory: false,
            showDefeat: false,
            selectedCards: [], //indexes of cards in hand

            bonusChallenge: null,
            bonusResourcePile: [],
        }
        this.discardThenDraw = this.discardThenDraw.bind(this)

        this.state.drawDeck = this.initialDeck(50);
    }

    componentDidMount () {
        this.moveCards(5,'drawDeck', 'hand');
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
        this.setState({ hasStarted: true, isPaused: false })
    }

    startMission = () => {

    }

    onTimerEnd = () => {
        this.setState({showDefeat: true})
    }

    //from hand
    //side FX
    playResource = (card, handIndex) => {
        const {currentChallenge, hand, resourcesPile} = this.state;

        //Make sure we don't play unnecessary cards,
        //since the drag and drop library doesn't give us a good way to prevent this
        if(!_.contains(this.getRemainingRequirements(currentChallenge.requirements, resourcesPile),card.resource)){
            return;
        }

        let resourceArray = resourcesPile;
        resourceArray.push(card.resource);

        let newHand = hand;
        newHand.splice(handIndex, 1)

        this.moveCards(1, 'drawDeck', 'hand');

        this.setState({ resourcesPile: resourceArray, hand: newHand })

        this.checkChallengeComplete();
    }

    //side FX
    moveCards = (amount, source, destination) => {
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
        if(this.state.isPaused) return;

        const newChallenge = this.state.challengeDeck.pop();
        const newState = {currentChallenge: newChallenge, resourcesPile: []};
        this.setState(newState);
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
    discardThenDraw = (e, amount = 3) => {
        if(this.state.isPaused) return;
        this.moveCards(amount, 'hand', 'discardPile')
        this.moveCards(amount, 'drawDeck', 'hand')
    }

    selectedCard = (group, card, index) => {

        if (this.state.isPaused) return;
        if (this.state.currentChallenge.type === 'discard'){
            let {selectedCards} = this.state;
            if(_.contains(selectedCards, index)){
                selectedCards = _.without(selectedCards, index)
            } else {
                selectedCards.push(index)
            }
            this.setState({selectedCards: selectedCards})

           setTimeout(this.checkChallengeComplete(), 100);

        } else {
            this.playResource(card, index);
        }
    }

    checkChallengeComplete = () => {
        //TODO: show cool animation?

        const {currentChallenge, hand, selectedCards, bonusChallenge, bonusResourcePile, resourcesPile} = this.state;
        if(currentChallenge === null) return;

        if(currentChallenge.type==="challenge"){
            if(this.getRemainingRequirements(currentChallenge.requirements, resourcesPile).length === 0) {
                this.onChallengeComplete();
            }
        } else if(currentChallenge.type==="discard"){
            console.log('checking', selectedCards, currentChallenge.type);
            //once user has selected N cards to discard
            let amountToDiscard;

            if(currentChallenge === 'all') {
                amountToDiscard = hand.length;
            } else {
                amountToDiscard = currentChallenge.amount;
            }

            if(selectedCards.length === amountToDiscard) {
                this.onChallengeComplete();

                this.setState({
                    hand: _.filter(hand, (card, index) =>{
                        return _.contains(this.selectedCard, index)
                    })
                })
            }
            
        } else if(currentChallenge.type==="double"){
            if (this.getRemainingRequirements(currentChallenge.requirements, resourcesPile).length === 0 && 
                this.getRemainingRequirements(bonusChallenge, bonusResourcePile).length === 0) {
                this.onChallengeComplete();
            }
        }
    }

    //side FX
    onChallengeComplete = () => {
        const {challengeDeck} = this.state;
        console.log('done')
        //try to draw a card from the challenge deck
        if(challengeDeck.length === 0){
            console.log('you win!')
            this.setState({showVictory: true})

        } else {
            this.setState({currentChallenge: null, resourcesPile: []})
        }
    }

    shouldAcceptDrop = (incoming, payload, challengeRequirements) => {
       return _.contains(
           this.getRemainingRequirements(challengeRequirements, this.state.resourcesPile), 
           payload.resource
        )
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
            selectedCards,
            showVictory,
            showDefeat,
        } = this.state;

        if(!exampleChallengeCardData) {
            return <div>Loading...</div>
        }

        const challengeRequirements = currentChallenge ? this.getRemainingRequirements(currentChallenge.requirements, resourcesPile) : [];

        return (
            <div className="container">
                {hasStarted ? <MissionCountdown startCountdown={this.startCountdown}/> :
                    <div className="missionContent">
                            <Timer 
                                onPause={()=>{this.setState({isPaused: true})}}
                                onPlay={()=>{this.setState({isPaused: false})}}
                                updateRemainingTime={(time)=>{this.setState({timeRemaining: time})}}
                                timeEnded={this.onTimerEnd}
                            />
                        <div className="playArea">
                            <div className="row challengeDeckArea">
                                <button
                                    className="challengeDeck card"
                                    disabled={!(challengeRequirements.length === 0 && challengeDeck.length > 0)}
                                    onClick={()=>{this.drawNewChallenge()}}
                                >
                                    Challenge Deck: {challengeDeck.length}
                                </button>
                                {
                                    currentChallenge!==null ? <ChallengeCard {...currentChallenge} /> : null
                                }
                            </div>
                            <div className="row requirementsArea d-flex justify-content-center">
                                <div className="requirements">
                                    {_.map(resourcesPile, (requirement, index) => {
                                            return <div className="card paid" key={index}> {requirement} </div>
                                    })}  
                                    { _.map(challengeRequirements, (requirement, index) => {
                                        return <img className="resourceCard card" key={index} src={getResourceImg(requirement)}/>
                                    })} 
                                </div>
                            </div>
                            <div className="row  d-flex justify-content-center">
                                <div 
                                    className="btn btn-warning"
                                    disabled={drawDeck.length === 0}
                                    onClick={this.discardThenDraw}
                                >
                                    Discard 3, Draw 3 <i className="fas fa-sync-alt"/>
                                </div>
                            </div>
                            <div className="row handArea">
                                <div className="drawDeck card">
                                    Draw Deck: {drawDeck.length}
                                    
                                </div>
                                <div className="hand">
                                    {_.map(hand, (card, index) => {
                                        return (
                                            <div 
                                                key={index}
                                                onClick={()=>{this.selectedCard("hand", card, index)}}
                                            >
                                            <img className={`card ${_.contains(selectedCards, index) ? 'tint' : null}`} src={getResourceImg(card.resource)}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        {showVictory || showDefeat ? 
                            <div className="modal" tabIndex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <p>{showVictory ? "Congrats! You did it!" : "Sorry, better luck next time!"}</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={console.log("redirect back to home")} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                }
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
