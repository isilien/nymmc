import React, { Component } from 'react'
import BlogContent from './components/BlogContent'

//container for blogContent (blog posts)
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {contents: null}
    }
    componentDidMount() {

        fetch('api/blogs', {
            headers: {
                content: 'adventure_1'
            }
        })
            .then(res => res.text())
            .then(blogs => this.setState({ contents: blogs }));
    }
    render() {
        const { contents } = this.state
        let blogs;
        console.log(contents)
        if (contents !== null) {
            blogs = contents.map(content => <BlogContent content={content} key={content.id} />)
        }
        const elements = (this.state) ? 'No posts' : blogs;

        return (
            <div id="home-content">
                {elements}
            </div>
        )
    }
}
export default Blog;
