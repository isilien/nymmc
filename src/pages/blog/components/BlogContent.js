import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../index.css';

class BlogContent extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {content} = this.props;
        console.log(content)
        return (
            <div className={styles.blogContent}>
                <h2>{content.title}</h2>
                <h3>author: {content.author} posted: {content.publish_date || "2018-01-01"}</h3>
                <iframe sandbox="allow-scripts allow-forms allow-same-origin" srcDoc={content.file}/>
            </div>
        )
    }
}

BlogContent.propTypes = {
    content : PropTypes.object.isRequired
}

export default BlogContent