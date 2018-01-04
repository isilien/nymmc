import React, { Component } from 'react'
import BlogContent from './components/BlogContent'

//container for blogContent (blog posts)
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        fetch('api/blogs')
            .then(res => res.json())
            .then(blogs => this.setState({ blogs: blogs }));
    }

    render() {
        const { blogs } = this.state
        const elements = (blogs) ? blogs.map(content => <BlogContent content={content} key={content._id} />) : 'No posts';
        return (
            <div id="home-content">
                {elements}
            </div>
        )
    }
}
export default Blog;
