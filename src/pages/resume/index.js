import React, { Component } from 'react';
import markdownSource from '../../assets/resume.md'

class Resume extends Component {
    render() {
        return (
            <div className="container" dangerouslySetInnerHTML={{__html:markdownSource}}/>
        );
    }
}
export default Resume;
