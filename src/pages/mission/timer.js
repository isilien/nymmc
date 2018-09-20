import React, {Component} from 'react'
import moment from 'moment'

class Timer extends Component {
    constructor(props){
        super(props)

        this.state = {
            isPaused: false,
            seconds: 300,
            started: false
        }
    }

    countTime = () => {
        if(this.state.isPaused) return;

        const newTime = this.state.seconds - 1;

        this.setState({seconds: newTime});
        this.props.updateRemainingTime(newTime);

        if(this.state.seconds <1 ) {
            console.log("time is up")
            this.props.timeEnded();
            return;
        } else {
            setTimeout(this.countTime, 1000);
        }
    }

    startTimer = () => {
        const {
            started,
            isPaused
        } = this.state;
        if(started) {
            if(isPaused) {
                this.setState({isPaused: false})
                setTimeout(this.countTime, 1000);
                this.props.onPlay();
            }
        } else {
            this.setState({started: true, isPaused: false})
            setTimeout(this.countTime, 1000);
            this.props.onPlay();
        }
        
    }

    pauseTimer = () => {
        this.setState({isPaused: !this.state.isPaused})
        this.props.onPause();
    }

  render() {
      const {
          seconds,
          isPaused,
          started
        } = this.state;
        return (
            <div>
                {isPaused || !started ? <button onClick={this.startTimer}>Start</button> : 
                <button onClick={this.pauseTimer}>Pause</button>}
                {Math.floor(seconds/60)}:{seconds%60}
            </div>
        )
  }
}

export default Timer;