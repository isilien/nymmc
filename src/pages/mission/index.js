import _ from 'underscore'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Draggable } from 'react-smooth-dnd';
import Timer from './timer';

import MissionCountdown from './countdown';
import actionCreators from '../../modules/mission/actions';
import './index.css';
import ChallengeCard from './challengeCard';
import resourceCardDefs from '../../assets/resourceCardDefs.json';
import './card.css';

import devImgSrc from '../../assets/images/api.png';
import UXImgSrc from '../../assets/images/ux.png';
import opsImgSrc from '../../assets/images/ops.png';

import victoryModalSrc from '../../assets/images/modals/victory.png';
import gameOverModalSrc from '../../assets/images/modals/gameOver.png';

import challengeDeckBack from '../../assets/images/challengeDeck.png';
import drawDeckBack from '../../assets/images/drawDeck.png';

const challengeDeckSrc = require('../../assets/challengeDeck.json');
import discardButtonSrc from '../../assets/images/discardDraw.png';

import cancelDiscardSrc from '../../assets/images/cancel.png';

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
            challengeDeck: challengeDeckSrc[props.match.params.id].reverse(),
            timeRemaining: 600,
            currentChallenge: null,
            showVictory: false,
            showDefeat: false,
            selectedCards: [], //indexes of cards in hand

            bonusChallenge: null,
            bonusResourcePile: [],
        }

        this.state.drawDeck = this.initialDeck(100);
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
        this.setState({showDefeat: true, isPaused: true})
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
    discardThenDraw = () => {
        if(this.state.isPaused) return;
        this.setState({isDiscarding: true})
    }

    selectedCard = (group, card, index) => {

        const {hand, isDiscarding, isPaused, currentChallenge} = this.state;
        let {selectedCards} = this.state;

        if (isPaused || currentChallenge === null) return;
        if (currentChallenge.type === 'discard' && isDiscarding === false){
            if(_.contains(selectedCards, index)){
                selectedCards = _.without(selectedCards, index)
            } else {
                selectedCards.push(index)
            }
            this.setState({selectedCards: selectedCards})

           setTimeout(this.checkChallengeComplete(), 100);

        } else if (isDiscarding) {
            if(_.contains(selectedCards, index)){
                selectedCards = _.without(selectedCards, index)
            } else {
                selectedCards.push(index)
            }

            if(selectedCards.length === 3) {
                this.setState({
                    selectedCards: [], 
                    hand: hand.filter((card, index)=>{
                        return !_.contains(selectedCards,index)
                    }),
                    isDiscarding: false
                })

            } else {
                this.setState({selectedCards: selectedCards})
            }
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
                    selectedCards: [], 
                    hand: hand.filter((card, index)=>{
                        return !_.contains(selectedCards,index)
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
        const {challengeDeck, hand} = this.state;
        //try to draw a card from the challenge deck
        if(challengeDeck.length === 0){
            console.log('you win!')
            this.setState({showVictory: true, isPaused: true})

        } else {
            this.setState({currentChallenge: null, resourcesPile: []})
        }
    }

    drawUpTo5 = () => {
        const {hand} = this.state;
        if(hand.length < 5) {
            this.moveCards(5-hand.length, 'drawDeck','hand')
        }
    }

    shouldAcceptDrop = (incoming, payload, challengeRequirements) => {
       return _.contains(
           this.getRemainingRequirements(challengeRequirements, this.state.resourcesPile), 
           payload.resource
        )
    }

    render() {
        const {
            hasStarted,
            currentChallenge,
            isPaused,
            hand,
            drawDeck,
            resourcesPile,
            timeRemaining,
            isDiscarding,
            challengeDeck,
            selectedCards,
            showVictory,
            showDefeat,
        } = this.state;

        if(!challengeDeckSrc) {
            return <div>Loading...</div>
        }

        const challengeRequirements = currentChallenge ? this.getRemainingRequirements(currentChallenge.requirements, resourcesPile) : [];

        return (
            <div> {hasStarted === false ? <MissionCountdown startCountdown={this.startCountdown}/> :
                <div className="playArea">
                    <div className="missionContent">
                        <Timer 
                            onPause={()=>{this.setState({isPaused: true})}}
                            onPlay={()=>{this.setState({isPaused: false})}}
                            updateRemainingTime={(time)=> { if(!isPaused) {this.setState({timeRemaining: time})}}}
                            timeEnded={this.onTimerEnd}
                        />
                        <div className="row d-flex justify-content-between align-items-top">
                            <img
                                className={`challengeDeck ${currentChallenge === null ? 'readyToDraw' : ''}`}
                                title="Challenge Deck"
                                disabled={!(challengeRequirements.length === 0 && challengeDeck.length > 0)}
                                onClick={()=>{if(currentChallenge === null) { this.drawNewChallenge()}}}
                                src={challengeDeckBack}
                            />
                            <div className="currentChallengeCard">
                                {currentChallenge!==null ? <ChallengeCard {...currentChallenge} /> : null}
                            </div>
                            <div className="col-6">
                                {currentChallenge !== null ? 
                                <div className="d-flex justify-content-center">
                                    <h2 style={{color: 'white'}}>Requirements</h2>
                                </div> : null}
                                <div className={`row d-flex justify-content-center ${currentChallenge !== null ? 'requirementsArea' : ''}`}>
                                    <div className="requirements">
                                        {_.map(resourcesPile, (requirement, index) => {
                                            return <img className="resourceCard card paid" key={index} src={getResourceImg(requirement)}/>
                                        })}  
                                        { _.map(challengeRequirements, (requirement, index) => {
                                            return <img className="resourceCard card" key={index} src={getResourceImg(requirement)}/>
                                        })} 
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between align-items-center mt-5">
                                <div className="ml-3">
                                    {
                                        drawDeck.length > 0 ? 
                                        <img
                                            src={drawDeckBack} 
                                            className={`drawDeck challengeDeck ${hand.length <5 ? 'readyToDraw' : ''}`}
                                            title="Resources Deck"
                                            onClick={ () => { if(hand.length <5) this.drawUpTo5(); }}
                                        /> : 
                                        <button 
                                            onClick={()=>window.location=window.location}
                                            className="emptyDrawDeck"
                                        >
                                            <br/><p>No cards left!<br/><br/>
                                            Click here to restart</p>
                                        </button>
                                    }
                                </div>
                                <div className="hand ml-5">
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
                                <div className="ml-5">
                                    { isDiscarding ?
                                        <img 
                                            src={cancelDiscardSrc} 
                                            className="discardButton"
                                            onClick={()=>{this.setState({selectedCards: [], isDiscarding: false})}}
                                        /> :
                                        <img 
                                            src={discardButtonSrc}
                                            className={`discardButton  ${drawDeck.length ? '' : 'disabled'}`}
                                            disabled={drawDeck.length === 0}
                                            onClick={this.discardThenDraw}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        { showVictory || showDefeat ? 
                            <div className="modal" tabIndex="-1" role="dialog" style={{color: 'black'}}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        Your Time: {Math.floor(timeRemaining/60)}:{timeRemaining%60 < 10 ? `0${timeRemaining%60}` : timeRemaining%60 }
                                        </div>
                                        <div className="modal-body">
                                            <img className="modal-graphic" src={showVictory ? victoryModalSrc : gameOverModalSrc}/>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={()=>{window.location = '/'}} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
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
