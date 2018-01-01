import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import mark from '../assets/images/mark.svg'

const StyledHeader = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    > * {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`
const StyledImage = styled.div`
    width: 64px;
    height: 64px;
    margin-left: 10px;
    margin-top: 10px;
`

const Divider = styled.div`
    width: 80%;
    height: 2px;
    background-color: #C69645;
    overflow: hidden;
    margin-bottom: 10px;    
`

class Header extends Component {
    render () {
        return (
            <div>
            <StyledHeader>
                <StyledImage>
                    <img src={mark}/>
                </StyledImage> 
                <Link to="/">code-witch</Link> 
                <Link to="/blog">stories</Link>
            </StyledHeader>
            <Divider/>          
        </div>
        )
    }
}

export default Header;