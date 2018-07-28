import React, { Component } from 'react';
import Select from 'react-select';

import { Link } from 'react-router-dom';
import styles from './index.css';

const options = [
    { value: 100, label: '>70%' },
    { value: 50, label: '20-70%' },
    { value: 25, label: '10-20%' },
    { value: -100, label: '<10%' },
];

const q1Weight = 1;
const q2Weight = 1;
const q3Weight = 0.5;

class Quizlet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phase: 0,
            q1: 0,
            q2: 0,
            q3: 0
        }
    }

    incrementPhase = () => {
        const { phase } = this.state;
        this.setState({ phase: phase + 1 })
    }

    handleChange = (value, question) => {
        this.setState({[question]:value})
    }

    getSurveyContent = () => {
        const formControlClass = "form-group col-md-6"
        
        const dark = { backgroundColor: '#292827', color: 'white'}
        const light = { backgroundColor: 'white',color: '#292827'}

        //TODO: Jam this into a global somewhere
        const rselectStyles = {
          control: styles => ({ ...styles, ...dark}),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            let newStyles = isFocused ? light : dark
            return {
              ...styles,
              ...newStyles
            };
          },
          menu: styles => ({ ...styles, ...dark}),
          placeholder: styles => ({ ...styles,  ...dark }),
          singleValue: (styles, { data }) => ({ ...styles,  ...dark }),
        };

        return (
            <div>
                <h2>Great! Tell me about your company.</h2>
                <form>
                    <div className={formControlClass}>
                        <label htmlFor="q1"> What % of your company identifies as women?</label>
                        <Select styles={rselectStyles} onChange={({value, label})=>this.handleChange(value, 'q1')} name="q1"
                            options={options} />

                    </div>
                    <div className={formControlClass}>
                        <label htmlFor="q2"> What % of your company identifies as POC?</label>
                        <Select styles={rselectStyles} onChange={({value, label})=>this.handleChange(value, 'q2')} name="q2"
                            options={options} />

                    </div>
                    <div className={formControlClass}>
                        <label htmlFor="q3"> What % of your company identifies as LGBTQ+?</label>
                        <Select styles={rselectStyles} onChange={({value, label})=>this.handleChange(value, 'q3')} name="q3"
                            options={options} />

                    </div>
                    <div className="col-md-6 form-group-row">
                        <button className="btn" onClick={() => { this.incrementPhase() }}>Submit</button>
                        <small className="pull-right"><a data-toggle="modal" data-target="#but_why_modal">Why are you asking this?</a></small>
                        {this.getModal('but_why_modal','Q: Why this questionnaire?','A: It saves us both time by surfacing details that aren\'t usually posted on a company\'s website. (And in case you\'re wondering: no, I don\'t save this data.)','Close')}
                    </div>
                </form>
            </div>
        );
    }

    getContentForPhase = (state) => {
        const {phase} = state;
        switch (phase) {
            case 0:
                return (
                    <div>
                        <div className="mx-auto">
                            <h2>Hi there :)</h2>
                            <p> You're probably here because you want me to work for you.</p>
                            <button className="btn" onClick={() => { this.incrementPhase() }}>Yep!</button>
                            <Link className="btn" to="/resume">I'm not sure...</Link>
                        </div>
                    </div>
                );
            case 1:
                return this.getSurveyContent();
                
            case 2:
                return this.getResultContent(state);
        }
    }

    getResultContent = ({q1,q2,q3}) => {

        const score = this.calculateScore(q1,q2,q3);
        
        if (score < 0) {
            return this.getBadResult();
        }
        if (score >= 0 && score < 0.16) {
            return this.getDecentishResult();
        }
        if (score >= 0.16 && score < 0.375) {
            return this.getGoodResult();
        }
        if (score >= 0.375) {
            return this.getGreatResult();
        }
    }

    getModal = (id, title, body, submitText) => {
        return (
            <div className="modal" id={id} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className={"modal-content " + styles.badModal}>
                        <div className="modal-header">
                            <h3 className="modal-title">{title} <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></h3>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">{submitText}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getBadResult = () => {
        return (
            <div>
                <div>
                    <h2>It seems your company isn't a good fit for me.</h2>
                        <a className="row" data-toggle="modal" data-target="#bad_response_modal">But, why?</a><br/>
                        <button className="btn btn-warning" target="_blank" href="mailTo:darcy.nelson@code-witch.net?subject=plz be a unicorn at my company">I understand, <i>and</i> I'm willing to meet your adjusted base salary requirement of 250k/year</button>
                </div>
                {this.getModal('bad_response_modal', 'Reasons Why',
                    <div className="modal-body">
                        <p>I don't want to work at a place ...</p>
                        <p> ... where I can be harassed with <a target="_blank" href="https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber">impugnity.</a></p>
                        <p> ... where my colleagues and leaders think an <a target="_blank" href="http://valleywag.gawker.com/the-boards-are-all-white-charting-diversity-among-tech-1442532538">abscence</a> of people of color in the workplace is acceptable.</p>
                        <p> ... where I can be <a target="_blank" href="https://www.aauw.org/research/the-simple-truth-about-the-gender-pay-gap/">paid less</a>, mentored less and promoted less often.</p>
                        <p> Based on my personal experience, a lack of diversity leads to all these things.</p>
                        <a data-toggle="modal" data-target="#bad_response_modal2">Isn't 250k a *little* steep?</a>
                    </div>,
                    'Ok, got it')}

                {this.getModal('bad_response_modal2', '>:[',
                    <p>I dunno, how much are your mental health and career <a target="_blank" href="http://fortune.com/2018/03/27/uber-agrees-to-settle-discrimination-lawsuit/">worth</a>?</p>, 'Good point')}

            </div>
        );
    }

    getDecentishResult = () => {
        return (
            <div>
                <div>
                    <h2>Sounds cool, tell me more!</h2>
                    <a target="_blank" href="mailTo:darcy.nelson@code-witch.net?subject=Work at my code-witch certified 'pretty darn cool' company">Send me an e-mail</a>
                </div>
            </div>
        );
    }

    getGoodResult = () => {
        return (
            <div>
                <div>
                    <h2>Sounds cool, tell me more!</h2>
                    <a target="_blank" href="mailTo:darcy.nelson@code-witch.net?subject=Work at my code-witch certified 'pretty darn cool' company">Send me an e-mail</a>
                </div>
            </div>
        );
    }

    getGreatResult = () => {
        return (
            <div>
                <div>
                    <h2>Wow. Sounds like an *awesome* place to work!</h2>
                    <a target="_blank" href="mailTo:darcy.nelson@code-witch.net?subject=Work at my code-witch certified AWESOME company">Please e-mail me!</a>
                </div>
            </div>
        );
    }

    calculateScore = (q1,q2,q3) => {
        let score = ((q1)+(q2)+(q3*q3Weight))/300;
        return score;
    }

    render() {
        const {q1,q2,q3} = this.state;
        this.calculateScore(q1,q2,q3)
        return (
            <div className="container">
                {this.getContentForPhase(this.state)}
            </div>
        );
    }
}
export default Quizlet;
