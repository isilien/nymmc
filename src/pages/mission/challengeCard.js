import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './challengeCard.css'
import _ from 'underscore';
import constants from '../../modules/mission/constants';
import cards from '../../assets/images/challenges/*.png';

//TODO: Move start button out
class ChallengeCard extends Component {
    getSymbolsForRequirements = (requirements) => {
        return <div>{_.map(requirements, (item, index) => {
            return <i key={index} className={`fas fa-${this.getSymbol(item)}`}/>
        })}</div>
    }

    getSymbol = (name) => {
        switch(name) {
            case 'ops':
                return constants.OPS;
            case 'dev':
                return constants.DEV;
            case 'UX':
                return constants.UX;
            default:
                return 'times-circle'
        }
    }

    render() {
        //TODO: use ID to get img?
        const {type, amount, src} = this.props;
        return (
            <div>
                {
                    type === 'challenge' ?
                    <img className="challengeCard" src={cards[src]}/> 
                    : <div  className="challengeCard">Discard {amount}</div>
                }
            </div>
        )
    }
}

ChallengeCard.propTypes = {
    src : PropTypes.string,
    type : PropTypes.string,
    amount : PropTypes.string,
}

export default ChallengeCard;