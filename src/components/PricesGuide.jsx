import './Guides.css';
import React, { Component } from 'react';

export default class PricesGuide extends Component {

    render() {
        //console.log(this.props.loggedInUser)

        return (
            <div className="guide-background">
                <div className="guide-popup">
                    <div className="guide-close">
                        <p><i className="fa fa-times" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesGuide", false)}></i></p>
                    </div>
                    <div className="guide-text">
                        <h2>Prices Guide</h2>
                        <p>{this.props.loggedInUser.name}</p>
                    </div>
                </div>
            </div>
        )
    }
}