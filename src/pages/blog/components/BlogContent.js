import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BlogContent extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {content} = this.props;
        return (
            <div>
            <h1>{content.title}</h1>
            <h2>author: IZALEU posted:{content.publish_date}</h2>
            <p>{content.body}</p>
            </div>
        )
    }
}

BlogContent.propTypes = {
    content : PropTypes.object.isRequired
}