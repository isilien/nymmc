import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './challengeCard.css'
import _ from 'underscore';
import constants from '../../modules/mission/constants';

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
        const {id, title, type, amount, requirements} = this.props;
        return (
            <div className="challengeCard card">
                <div className="cardTitle">{title}</div>
                {
                    type === 'challenge' ? 
                    <div className="cardSymbols">{this.getSymbolsForRequirements(requirements)}</div>
                    : <div>Discard {amount}</div>
                }
            </div>
        )
    }
}

ChallengeCard.propTypes = {
    id : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title : PropTypes.string,
    requirements : PropTypes.array
}

export default ChallengeCard;