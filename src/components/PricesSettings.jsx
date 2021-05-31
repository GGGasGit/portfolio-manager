import './Settings.css';
import React, { Component } from 'react';

export default class PricesSettings extends Component {

    state = {
        selectedCurrency: ""
    }

    componentDidMount() {
        this.setState({
            selectedCurrency: this.props.loggedInUser.base_currency,
        });
    }

    handleSelectCurrency = (e) => {
        const value = e.target.value;
        this.setState({
            selectedCurrency: value,
        });
    }

    handleClickOkButton = () => {
        this.props.handleCurrencyChange(this.state.selectedCurrency);
        this.props.makePopupVisible("PricesSettings", false)
    }

    render() {

        return (
            <div className="settings-background">
                <div className="settings-popup">
                    <div className="settings-popup-title">
                        <p className="settings-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Select Currency</p>
                    </div>
                    <div className="settings-popup-description">
                        <p>Click on the Currency dropdown list to select the currency in which the prices on the Prices tab are displayed.</p>
                    </div>
                    <div className="select-currency-container">
                        <label htmlFor="select-currency" className="select-currency-label">Currency: </label>
                        <select className="select-currency-list" value={this.state.selectedCurrency} onChange={this.handleSelectCurrency}>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="prices-settings-button-container">
                        <button type="button" className="prices-settings-button" onClick={this.handleClickOkButton}>OK</button>
                        <button type="button" className="prices-settings-button" onClick={() => this.props.makePopupVisible("PricesSettings", false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}