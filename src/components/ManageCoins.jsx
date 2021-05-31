import React, { Component } from 'react';

export default class ManageCoins extends Component {

    state = {
        symbol: "",
        symbolInput: "",
    }

    handleSymbolInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            symbol: value.toUpperCase(),
            symbolInput: value.toUpperCase()
        });
    };

    handleClickOnListItem = (e) => {
        const value = e.target.value;
        this.setState({
            symbol: value.toUpperCase(),
            symbolInput: "",
        });
    }

    handleClickAddButton = () => {
        const id = this.props.coins.filter(x => x.symbol === this.state.symbol).length === 1
            ? this.props.coins.filter(x => x.symbol === this.state.symbol)[0].coinId
            : -1
        if (id === -1) {
            alert("This portfolio manager does not recognise the coin you entered. Select one from the list.");
        } else {
            this.props.addWatchlistItem(id);
        }
        this.setState({
            symbol: "",
            symbolInput: "",
        });
    }

    handleClickCloseButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("EditWatchlist", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : ""

        const symbolList = [...this.props.coins]
            .sort(this.props.compareFunction("symbol", true))
            .map(coin => <option className="ticker-item" key={coin.coinId} value={coin.symbol} onClick={this.handleClickOnListItem}>{coin.coinName}</option>);

        const watchlistItems = this.props.coinListCreator()
            .sort(this.props.compareFunction("symbol", true))
            .map(coin => <div key={coin.coinId} className="edit-watchlist-coin-item">
                <div className="edit-watchlist-coin-text-container">
                    <div className="edit-watchlist-coin-image"><img src={coin.logo} alt={`${coin.symbol} icon`} /></div>
                    <p className="edit-watchlist-coin-text">{`${coin.symbol}  -  ${coin.coinName}`}</p>
                </div>
                <div className="edit-watchlist-delete-icon"><i className="fa fa-trash" aria-hidden="true" onClick={() => this.props.deleteWatchlistItem(coin.coinId)}></i></div>
            </div>)

        return (
            <div>
                <div className="edit-watchlist-input-container">
                    <div className="edit-watchlist-input-description">
                        <h2 className="edit-watchlist-input-description-title">Add/remove coin</h2>
                        <p className="edit-watchlist-input-description-text">
                            To add a new coin to your watchlist, select one from the dropdown, then click Add.
                            To delete a coin from your watchlist, click on the trashcan icon next to the coin you want to delete.
                        </p>
                    </div>
                    <div className="edit-watchlist-input">
                        <div className="edit-watchlist-input-item">
                            <label className="watchlist-name-label" htmlFor="ticker-input">Add coin</label>
                            <input type="text" name="ticker-input" className="edit-watchlist-input-field" list="ticker-list"
                                autoComplete="off" value={this.state.symbol}
                                onChange={this.handleSymbolInputChange}>
                            </input>
                            <datalist className="ticker-list" id="ticker-list">{symbolList}</datalist>
                        </div>
                    </div>
                    <div className="edit-watchlist-coin-container">{watchlistItems}</div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-watchlist-button-container">
                    <button type="button" className="edit-watchlist-button" onClick={this.handleClickAddButton}>Add</button>
                    <button type="button" className="edit-watchlist-button" onClick={this.handleClickCloseButton}>Close</button>
                </div>
            </div>
        )
    }
}