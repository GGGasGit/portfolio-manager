import './Settings.css';
import React, { Component } from 'react';

export default class PortfoliosSettings extends Component {

    render() {

        return (
            <div className="settings-background">
                <div className="settings-popup">
                    <div className="settings-close">
                        <p><i className="fa fa-times" aria-hidden="true" onClick={() => this.props.makePopupVisible("PortfoliosSettings", false)}></i></p>
                    </div>
                    <div className="settings-text">
                        <h2>Porfolio Settings</h2>
                    </div>
                </div>
            </div>
        )
    }
}