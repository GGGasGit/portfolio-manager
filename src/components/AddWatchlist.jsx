import './AddWatchlist.css';
import React, { Component } from 'react';

export default class AddWatchlist extends Component {

    state = {
        watchlistName: "",
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            watchlistName: value,
        });
    }

    handleClickAddButton = () => {
        this.props.handleCreateNewWatchlist(this.state.watchlistName);
    }

    handleClickCancelButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("AddWatchlist", false);
    }

    render() {
        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : ""

        return (
            <div className="add-watchlist-background">
                <div className="add-watchlist-popup">
                    <div className="add-watchlist-popup-title">
                        <p className="add-watchlist-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Add Watchlist</p>
                    </div>
                    <div className="add-watchlist-popup-description">
                        <p>Enter a name for your new watchlist, then click Add. Click Cancel to close the dialogue without adding a new watchlist.</p>
                    </div>
                    <div className="add-watchlist-input-container">
                        <div className="add-watchlist-input">
                            <label htmlFor="watchlist-name" className="watchlist-name-label">Watchlist name</label>
                            <input type="text" className="watchlist-name-input" name="watchlist-name" onChange={this.handleInputChange}></input>
                        </div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                    <div className="add-watchlist-button-container">
                        <button type="button" className="add-watchlist-button" onClick={this.handleClickAddButton}>Add</button>
                        <button type="button" className="add-watchlist-button" onClick={this.handleClickCancelButton}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}