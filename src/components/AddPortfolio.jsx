import './AddPopups.css';
import React, { Component } from 'react';

export default class AddPortfolio extends Component {

    state = {
        portfolioName: "",
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            portfolioName: value,
        });
    }

    handleClickAddButton = () => {
        if (this.state.portfolioName === "") {
            alert('You have to add a name first!')
        } else {
            this.props.handleCreateNewPortfolio(this.state.portfolioName);
        }
    }

    handleClickCancelButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("AddPortfolio", false);
    }

    render() {
        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : ""

        return (
            <div className="popup-background">
                <div className="popup-foreground">
                    <div className="popup-title">
                        <p className="popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Add Portfolio</p>
                    </div>
                    <div className="popup-description">
                        <p>Enter a name for your new portfolio, then click Add. Click Cancel to close the dialogue without adding a new portfolio.</p>
                    </div>
                    <div className="add-popup-input-container">
                        <div className="add-popup-input">
                            <label htmlFor="portfolio-name" className="add-popup-name-label">Portfolio name</label>
                            <input type="text" className="add-popup-name-input" name="portfolio-name" onChange={this.handleInputChange}></input>
                        </div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                    <div className="popup-button-container">
                        <button type="button" className="popup-button" onClick={this.handleClickAddButton}>Add</button>
                        <button type="button" className="popup-button" onClick={this.handleClickCancelButton}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}