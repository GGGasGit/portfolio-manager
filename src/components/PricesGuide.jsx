import './Guides.css';
import React, { Component } from 'react';

export default class PricesGuide extends Component {

    render() {

        return (
            <div className="guide-background">
                <div className="guide-popup">
                    <div className="guide-close">
                        <p><i className="fa fa-times" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesGuide", false)}></i></p>
                    </div>
                    <div className="guide-text">
                        <h2>Prices Guide</h2>
                    </div>
                </div>
            </div>
        )
    }
}