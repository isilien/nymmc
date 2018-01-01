import React, { Component } from 'react';
//import './index.css';

class Blog extends Component {
    componentDidMount() {

        fetch('api/blogs', {
            headers: {
                content: 'adventure_1'
            }
        })
            .then(res => res.text())
            .then(blogs => this.setState({ blogs: blogs }));
    }
    render() {
        const { blogs } = this.state || '';
        return (
            <div>
                <div id="home-content">
                    Witchery goes here. Blogs: {blogs}
                </div>
            </div>
        );
    }
}
export default Blog;
