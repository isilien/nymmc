import React, { Component } from 'react';
import styles from './index.css';

class Quizlet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 0,
            percentage: 0,
            multiplier: 1
        }
    }

    getContentForPhase = (phase, percentage, multiplier) => {
        switch (phase) {
            case 0:
                return (
                    <div>
                        <div>
                            <p>Hi! You're probably here because you want me to work for you.</p>
                            <button className={styles.button} onClick={() => { this.setState({ phase: phase + 1 }) }}>Yep</button>
                        </div>
                        <a>I'm not sure...</a>
                    </div>
                );
            case 1:
                const formControlClass = "form-group col-md-6"
                return (<div>
                            <h3>Great! Just fill out this quick survey.</h3><br/>
                            <form>
                                <div className={formControlClass}>
                                    <label htmlFor="q1"> What % of your company identifies as women?</label>
                                    <select className="form-control" id="q1">
                                        <option>{'<20%'}</option>
                                        <option>20-40%</option>
                                        <option>40-80%</option>
                                        <option>{'>80%'}</option>
                                        <option>I don't know...</option>
                                    </select>
                                </div>
                                <div className={formControlClass}>
                                    <label htmlFor="q1"> What % of your company identifies as POC?</label>
                                    <select className="form-control" id="q1">
                                        <option>{'<20%'}</option>
                                        <option>20-40%</option>
                                        <option>40-80%</option>
                                        <option>{'>80%'}</option>
                                        <option>I don't know...</option>
                                    </select>
                                </div>
                                <div className={formControlClass}>
                                    <label htmlFor="q1"> What % of your company identifies as LGBTQ+?</label>
                                    <select className="form-control" id="q1">
                                        <option>{'<20%'}</option>
                                        <option>20-40%</option>
                                        <option>40-80%</option>
                                        <option>{'>80%'}</option>
                                        <option>I don't know...</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group-row">
                                    <button type="submit" className="btn" onClick={() => { this.setState({ phase: phase + 1 }) }}>Submit</button>
                                    <small className="pull-right"><a>Why are you asking this?</a></small>
                                </div>
                            </form>
                        </div>
                );
            case 2:
                return this.getResultContent(percentage, multiplier)
        }
    }

    getResultContent = (percentage, multiplier) => {

        const score = percentage * multiplier;

        if (score < 0.2) {
            return this.getBadResult();
        }
        if (score > 0.2 && score < 0.4) {
            return this.getDecentishResult();
        }
        if (score > 0.4 && score < 0.8) {
            return this.getGoodResult();
        }
        if (score > 0.8) {
            return this.getGreatResult();
        }
    }

    getBadResult = () => {
        return (
            <div>
                <div>
                    <p>Your company doesn't seem like a good fit for me.</p>
                    <a>But why?</a><br />
                    <a>I understand, <i>and</i> I'm willing to meet your base salary requirement of 250k/year</a>
                </div>
            </div>
        );
    }

    getDecentishResult = () => {
        return (
            <div>
                <div>
                    My base salary requirement: 170k
                    <a>Let's talk!</a>
                </div>
            </div>
        );
    }

    getGoodResult = () => {
        return (
            <div>
                <div>
                    My base salary requirement: 140k
                    <a>Let's talk!</a>
                </div>
            </div>
        );
    }

    getGreatResult = () => {
        return (
            <div>
                <div>
                    My base salary requirement: 130k
                    <a>Let's talk!</a>
                </div>
            </div>
        );
    }

    render() {
        const { phase, percentage, multiplier } = this.state;
        return (
            <div className="container">
                {this.getContentForPhase(phase, percentage, multiplier)}
            </div>
        );
    }
}
export default Quizlet;
