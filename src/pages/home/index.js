import React, { Component } from 'react';
import { Header } from '../../sharedComponents'
//import './index.css';

class Home extends Component {
    componentDidMount() {
        
        fetch('api/blogs',{headers: {
            content: 'adventure_1'
        }})
            .then(res => res.text())        
            .then(blogs => this.setState({ blogs : blogs }));
    }
    render() {
        const {blogs} = this.state || '';
        return (
            <div>
                <Header/>
                <div id="home-content">
                    Witchery goes here. Blogs: {blogs}
                </div>
            </div>
        );
    }
}
export default Home;
