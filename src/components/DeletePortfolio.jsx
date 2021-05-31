import React, { Component } from 'react';

export default class DeletePortfolio extends Component {

    handleClickDeleteButton = () => {
        this.props.deletePortfolio();
        this.props.makePopupVisible("EditPortfolio", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div>
                <div className="edit-portfolio-input-container">
                    <div className="edit-portfolio-input-description">
                        <h2 className="edit-portfolio-input-description-title">Delete portfolio</h2>
                        <p className="edit-portfolio-input-description-text">
                            To delete the portfolio, click Delete.
                        </p>
                        <p className="edit-portfolio-input-description-text warning-text">
                            <span className="warning-text-highlight">Warning:</span><br/>
                            You are about to delete the portfolio <span className="warning-text-highlight">{this.props.loggedInUser.portfolios[this.props.currentPortfolio].name}</span>.<br/><br/>
                            The deletion of the portfolio and all its assets is permanent, you will not be able to recover
                            them after clicking Delete.
                        </p>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-portfolio-button-container">
                    <button type="button" className="edit-portfolio-button" onClick={this.handleClickDeleteButton}>Delete</button>
                    <button type="button" className="edit-portfolio-button" onClick={() => this.props.makePopupVisible("EditPortfolio", false)}>Close</button>
                </div>
            </div>
        )
    }
}