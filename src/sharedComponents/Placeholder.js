import React, { Component } from 'react'
import styles from './Placeholder.css'
import mark from '../assets/images/mark.svg'
import CircleType from 'circletype';

const RADIUS = 220

class Placeholder extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount () {
        const topText = new CircleType(document.getElementById('placetext-top')).radius(RADIUS);
        const bottomText = new CircleType(document.getElementById('placetext-bottom')).dir(-1).radius(RADIUS)
    }

    render() {
        return (
            <div className={styles.container}>
                <div id='placetext-top' className={styles.text}>
                    pardon our fairy dust
                </div>   
                <div className={styles.image}>
                    <img src={mark}/>
                </div>
                <div id='placetext-bottom' className={styles.text}>
                    witchery in progress                    
                </div>   
            </div>
        )
    }
}

export default Placeholder;