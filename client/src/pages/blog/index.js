import React, { Component } from 'react';
import {Header} from '../../sharedComponents'
//import './index.css';

class Blog extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="blog-container">
                    <h1 className="blog-title">Blog Title</h1>
                </div>
            </div>
        );
    }
}
export default Blog;
