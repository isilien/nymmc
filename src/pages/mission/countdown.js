import React, {Component} from 'react'
import './countdown.css'

//TODO: Move start button out
class MissionCountdown extends Component {
    constructor(props){
        super(props)
        this.state = { index: 0 }
    }

    increment = () => {
        this.setState(state => ({ index: state.index + 1 }))
    }

    beginCountdown = e => {
        this.setState(state => ({ index: 0 }))
        setTimeout(()=>{this.increment()}, 0);
        setTimeout(()=>{this.increment()}, 1000);
        setTimeout(()=>{this.increment()}, 2000);
        setTimeout(()=>{this.increment()}, 3000);
        setTimeout(()=>{this.props.startCountdown()}, 4000);
    }

  render() {
      const text = this.state.index < 4 ? 4 - this.state.index : "Go!";
        return (
            <div className="timer">
                {this.state.index === 0 ?  
                    <button className="btn btn-success" onClick={this.beginCountdown} >
                        Start Mission
                    </button>
                    : <div className="modal" tabIndex="-1" role="dialog"  style={{color: 'black'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="countdown">
                                    {this.state.index > 0 ? 
                                        <div >{text}</div>
                                    : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                
               
                
            </div>
        )
  }
}

export default MissionCountdown;