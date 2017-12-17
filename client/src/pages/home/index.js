import React, { Component } from 'react';
import { Header } from '../../sharedComponents'
//import './index.css';

class Home extends Component {
    componentDidMount() {
        
        fetch('api/users',{headers: {
            content: 'adventure_1'
        }})
            .then(res => res.text())        
            .then(users => this.setState({ users : users }));
    }
    render() {
        const {users} = this.state || '';
        return (
            <div>
                <Header/>
                <div id="home-content">
                    Witchery goes here. Users: {users}
                </div>
            </div>
        );
    }
}
export default Home;
