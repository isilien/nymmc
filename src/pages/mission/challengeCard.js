import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './challengeCard.css'
import _ from 'underscore';
import constants from '../../modules/mission/constants';

//TODO: Move start button out
class ChallengeCard extends Component {
    constructor(props){
        super(props)
    }

    getSymbolsForRequirements = (requirements) => {
        return _.map(requirements, (item, index) => {
            let symbolName = 'times-circle';
            if(item==='ops') symbolName = constants.OPS;
            if(item==='dev') symbolName = constants.DEV;
            if(item==='ux') symbolName = constants.UX;

            return <i key={index} className={`fas fa-${symbolName}`}/>
        })
    }

    render() {
        //TODO: use ID to get img?
        const {id, title, requirements} = this.props;
        return (
            <div className="challengeCard" key={id}>
                <div className="cardTitle">{title}</div>
                <div className="cardSymbols">{this.getSymbolsForRequirements(requirements)}</div>
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