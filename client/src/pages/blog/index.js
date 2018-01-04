import React, { Component } from 'react'
import BlogContent from './components/BlogContent'
import styles from './index.css'

//container for blogContent (blog posts)
class Blog extends Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.state = {}
    }
    componentDidMount() {
        this.getPosts();
    }

    getPosts () {
        fetch('api/blogs')
            .then(res => res.json())
            .then(blogs => this.setState({ blogs: blogs }));
    }

    handlePost () {
        fetch('api/blogs',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                _id: "2",
                title: "The Golden Hour",
                publish_date: "2018-01-07",
                author: "IZALEU",
                filename: "the-golden-hour"
            }])
        }).then(this.getPosts())
    }

    render() {
        const { blogs } = this.state
        const elements = (blogs && blogs.length) ? blogs.map(content => <BlogContent content={content} key={content._id} />) : <div>Click <a onClick={this.handlePost}>here</a> to add a new post.</div>;
        return (
            <div className={styles.blog}>
                {elements}
            </div>
        )
    }
}
export default Blog;
