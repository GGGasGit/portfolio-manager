import './AddPortfolio.css';
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
        this.props.handleCreateNewPortfolio(this.state.portfolioName);
    }

    handleClickCancelButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("AddPortfolio", false);
    }

    render() {
        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : ""

        return (
            <div className="add-portfolio-background">
                <div className="add-portfolio-popup">
                    <div className="add-portfolio-popup-title">
                        <p className="add-portfolio-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Add Portfolio</p>
                    </div>
                    <div className="add-portfolio-popup-description">
                        <p>Enter a name for your new portfolio, then click Add. Click Cancel to close the dialogue without adding a new portfolio.</p>
                    </div>
                    <div className="add-portfolio-input-container">
                        <div className="add-portfolio-input">
                            <label htmlFor="portfolio-name" className="portfolio-name-label">Portfolio name</label>
                            <input type="text" className="portfolio-name-input" name="portfolio-name" onChange={this.handleInputChange}></input>
                        </div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                    <div className="add-portfolio-button-container">
                        <button type="button" className="add-portfolio-button" onClick={this.handleClickAddButton}>Add</button>
                        <button type="button" className="add-portfolio-button" onClick={this.handleClickCancelButton}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}