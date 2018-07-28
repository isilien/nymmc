import React, { Component } from 'react';
import markdownSource from '../../assets/resume.md'
import { Link } from 'react-router-dom';

class Resume extends Component {
    render() {
        return (
            <div className="container">
                <p>Interested in hiring me? Click <Link to="/quizlet">here!</Link></p>
                <div dangerouslySetInnerHTML={{__html:markdownSource}}/>
            </div>
        );
    }
}
export default Resume;
