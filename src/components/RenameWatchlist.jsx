import React, { Component } from 'react';

export default class RenameWatchlist extends Component {

    state = {
        watchlistName: ""
    }

    componentDidMount() {
        this.setState({
            watchlistName: this.props.loggedInUser.watchlists[this.props.currentWatchlist].name
        });
    }

    handleNameInputChange = (e) => {
        const value = e.target.value.length <= 20 ? e.target.value : e.target.value.slice(0, 20);
        this.setState({
            watchlistName: value
        });
    }

    handleClickRenameButton = () => {
        if (this.state.watchlistName) {
            this.props.renameWatchlist(this.state.watchlistName);
        } else {
            alert("You need to add a name in the Name field first.");
        }
    }

    handleClickCloseButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("EditWatchlist", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div>
                <div className="edit-watchlist-input-container">
                    <div className="edit-watchlist-input-description">
                        <h2 className="edit-watchlist-input-description-title">Rename watchlist</h2>
                        <p className="edit-watchlist-input-description-text">
                            To rename the watchlist, edit the name in the Name field, then click Rename.
                        </p>
                    </div>
                    <div className="edit-watchlist-input">
                        <div className="edit-watchlist-input-item">
                            <label className="edit-watchlist-input-label" htmlFor="name-input">Name</label>
                            <input type="text" name="name-input" className="edit-watchlist-input-field"
                                value={this.state.watchlistName}
                                onChange={this.handleNameInputChange} >
                            </input>
                        </div>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-watchlist-button-container">
                    <button type="button" className="edit-watchlist-button" onClick={this.handleClickRenameButton}>Rename</button>
                    <button type="button" className="edit-watchlist-button" onClick={this.handleClickCloseButton}>Close</button>
                </div>
            </div>
        )
    }
}