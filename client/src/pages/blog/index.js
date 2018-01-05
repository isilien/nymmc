import React, { Component } from 'react'
import BlogContent from './components/BlogContent'
import styles from './index.css'

//container for blogContent (blog posts)
class Blog extends Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleSelectFile () {
        const file = this.fileInput.files[0];
        const reader = new FileReader();
        // We read the file and call the upload function with the result
        reader.onload = (e) => {
            let formValue = { file: e.currentTarget.result }
            if (this.state.form) formValue = Object.assign(this.state.form, formValue)
            this.setState({ form: formValue });
        }
        reader.readAsText(file); //UTF-8 by default
    }

    handlePost (event) {
        event.preventDefault()
        const body = JSON.stringify(this.state.form)

        fetch('api/blogs',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }).then( res => {
            this.setState({});
            this.getPosts();
        });
    }

    handleChange(event) {
        let formValue = {[event.target.name]: event.target.value.toUpperCase()}
        if(this.state.form) formValue = Object.assign(this.state.form, formValue)
        this.setState({ form: formValue});
    }

    render() {
        const { blogs } = this.state
        const elements = (blogs && blogs.length) ? blogs.map(content => <BlogContent content={content} key={content._id} />) : 'No blogs found';
        return (
            <div>
                <form encType="multipart/form-data" onSubmit={this.handlePost}>
                    <label>
                        Twine File:
                        <input 
                            type="file" 
                            ref={
                                input => {
                                    this.fileInput = input;
                                }
                            }
                            onChange={this.handleSelectFile}/>
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" onChange={this.handleChange} value={this.state.title} defaultValue="Sudden Betrayal"/>
                    </label>
                    <label>
                        Submission Date:
                        <input type="text" name="publish_date" onChange={this.handleChange} value={this.state.publish_date} defaultValue={new Date()}/>
                    </label>
                    <label>
                        Author:
                        <input type="text" name="author" onChange={this.handleChange} value={this.state.author} defaultValue="Everyone"/>
                    </label>
                    <input type="submit" onChange={this.handleChange} value="Submit" />
                </form>
                <div className={styles.blog}>
                    {elements}
                </div>
            </div>
        )
    }
}
export default Blog;
