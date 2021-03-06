import React, { Component } from 'react';

export default class DeleteWatchlist extends Component {

    handleClickDeleteButton = () => {
        this.props.deleteWatchlist();
        this.props.makePopupVisible("EditWatchlist", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div>
                <div className="edit-popup-input-container">
                    <div className="edit-popup-input-description">
                        <h2 className="edit-popup-input-description-title">Delete watchlist</h2>
                        <p className="edit-popup-input-description-text">
                            To delete the watchlist, click Delete.
                        </p>
                        <p className="edit-popup-input-description-text warning-text">
                            <span className="warning-text-highlight">Warning:</span><br/>
                            You are about to delete the watchlist <span className="warning-text-highlight">{this.props.loggedInUser.watchlists[this.props.currentWatchlist].name}</span>.<br/><br/>
                            The deletion of the watchlist is permanent, you will not be able to recover
                            it after clicking Delete.
                        </p>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="popup-button-container">
                    <button type="button" className="popup-button" onClick={this.handleClickDeleteButton}>Delete</button>
                    <button type="button" className="popup-button" onClick={() => this.props.makePopupVisible("EditWatchlist", false)}>Close</button>
                </div>
            </div>
        )
    }
}