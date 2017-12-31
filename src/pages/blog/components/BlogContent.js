import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BlogContent extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <div/>
    }
}

BlogContent.propTypes = {
    content : PropTypes.object.isRequired
}