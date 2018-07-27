import React, { Component } from 'react';
import {markdown} from 'markdown';
import markdownSource from '../../assets/resume.md'

class Resume extends Component {
    render() {
        return (
            <div className="container" dangerouslySetInnerHTML={{__html:markdownSource}}/>
        );
    }
}
export default Resume;
