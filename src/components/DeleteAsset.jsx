import React, { Component } from 'react';

export default class DeleteAsset extends Component {

    handleClickDeleteButton = () => {
        this.props.deleteAsset(this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets[this.props.currentAsset].coin_id);
        this.props.makePopupVisible("EditAsset", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];

        return (
            <div>
                <div className="edit-asset-input-container">
                    <div className="edit-asset-input-description">
                        <h2 className="edit-asset-input-description-title">Delete asset</h2>
                        <p className="edit-asset-input-description-text">
                            To delete the asset, click Delete.
                        </p>
                        <p className="edit-asset-input-description-text warning-text">
                            <span className="warning-text-highlight">Warning:</span><br/>
                            You are about to delete the asset <span className="warning-text-highlight">{this.props.coinFinder(currentAsset.coin_id).coinName}</span> from the portfolio <span className="warning-text-highlight">{currentPortfolio.name}</span>.<br/><br/>
                            You will delete all transactions in this asset from this portfolio.
                            This operations is permanent and cannot be undone.
                            If this is not what you intended, you can modify or delete each transaction individually on the Transactions tab.
                        </p>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-asset-button-container">
                    <button type="button" className="edit-asset-button" onClick={this.handleClickDeleteButton}>Delete</button>
                    <button type="button" className="edit-asset-button" onClick={() => this.props.makePopupVisible("EditAsset", false)}>Close</button>
                </div>
            </div>
        )
    }
}