import React, { Component } from 'react'
import styled from 'styled-components'
import mark from '../assets/images/mark.svg'
import CircleType from 'circletype';

const RADIUS = 220

const PlaceholderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-top: -200px;
  margin-left: -200px;
`
const StyledPlaceholder = styled.div`
   flex: auto;
   font-size: xx-large;
`

const StyledImage = styled.div`
    width: 256px;
    height: 256px;
`

class Placeholder extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount () {
        const topText = new CircleType(document.getElementById('placetext-top')).radius(RADIUS);
        const bottomText = new CircleType(document.getElementById('placetext-bottom')).dir(-1).radius(RADIUS)
    }

    render() {
        return (
            <PlaceholderContainer className="placeholder">
                <StyledPlaceholder id='placetext-top'>
                    pardon our fairy dust
                </StyledPlaceholder>   
                <StyledImage>
                    <img src={mark}/>
                </StyledImage>
                <StyledPlaceholder id='placetext-bottom'>
                    witchery in progress                    
                </StyledPlaceholder>   
            </PlaceholderContainer>
        )
    }
}

export default Placeholder;