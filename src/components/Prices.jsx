import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Prices.css';
import React, { Component } from 'react';

export default class Prices extends Component {

    state = {
        watchlistDropdownValue: 0,
    }

    componentDidMount() {
        this.setState({
            watchlistDropdownValue: this.props.currentWatchlist
        });
    }

    componentDidUpdate() {
        if (this.props.currentWatchlist !== this.state.watchlistDropdownValue) {
            this.setState({
                watchlistDropdownValue: this.props.currentWatchlist,
            });
        }
    }

    handleWatchlistDropdownChange = (e) => {
        const value = Number.parseInt(e.target.value, 10);
        this.setState({
            watchlistDropdownValue: value,
        });
        this.props.setCurrentIndex(value, "watchlist");
    }

    idToIndexConverter = (id) => {
        return this.props.loggedInUser.watchlists.findIndex(watchlist => watchlist.id === id);
    }

    handleSortColumn = (colNum) => {
        switch (colNum) {
            case 0:
                this.props.handleDataSort(0, "prices", this.props.dataSort.prices.isUp, "symbol");
                break;
            case 1:
                if (this.props.dataSort.prices.index === 1 && this.props.dataSort.prices.isUp) {
                    this.props.handleDataSort(1, "prices", true, "price_eur");
                } else if (this.props.dataSort.prices.index === 1 && !this.props.dataSort.prices.isUp) {
                    this.props.handleDataSort(2, "prices", false, "price_change");
                } else if (this.props.dataSort.prices.index === 2 && this.props.dataSort.prices.isUp) {
                    this.props.handleDataSort(2, "prices", true, "price_change");
                } else {
                    this.props.handleDataSort(1, "prices", false, "price_eur");
                }
                break;
            default:
                this.props.handleDataSort(0, "prices", false, "symbol");
        }
    }

    render() {

        const watchlistDropdown = this.props.loggedInUser.watchlists
            .map(watchlist => <option value={this.idToIndexConverter(watchlist.id)} key={watchlist.id}>{watchlist.name}</option>);

        const coins = this.props.loggedInUser.watchlists.length === 0 ? "" : this.props.coinListCreator()
            .sort(this.props.compareFunction(this.props.dataSort.prices.sortProperty, this.props.dataSort.prices.isUp))
            .map(coin => <div className="price-item" key={coin.coinId}>
                <div className="ticker">
                    <div className="ticker-image"><img src={coin.logo} alt={`${coin.symbol} icon`} /></div>
                    <div>
                        <p className="ticker-symbol">{`${coin.symbol}`}</p>
                        <p className="ticker-name">{`${coin.coinName}`}</p>
                    </div>
                </div>
                <div className="watchlist-price">
                    <p className={`ticker-price ${this.props.priceColorSetter(coin.price_change)}`}>{this.props.priceConverter(coin)}</p>
                    <p className={`ticker-price-change ${this.props.priceColorSetter(coin.price_change)}`}>{coin.price_change} %</p>
                </div>
            </div>
            );

        return (
            <div className="page-menu-container">
                <div className="page-menu-settings-container">
                        <p className="page-menu-sign"><i className="fa fa-plus-square" aria-hidden="true" onClick={() => this.props.makePopupVisible("AddWatchlist", true)}></i></p>
                        <p className="page-menu-sign"><i className="fa fa-pencil" aria-hidden="true" onClick={() => this.props.makePopupVisible("EditWatchlist", true)}></i></p>
                        <select name="watchlist-dropdown" className="page-menu-dropdown" value={this.state.watchlistDropdownValue} onChange={this.handleWatchlistDropdownChange} >{watchlistDropdown}</select>
                        <p className="page-menu-sign"><i className="fa fa-cog" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesSettings", true)}></i></p>
                        <p className="page-menu-sign page-menu-question-sign"><i className="fa fa-question-circle" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesGuide", true)}></i></p>
                </div>
                <div className="watchlist-header">
                    <p className="sortable-column" onClick={() => this.handleSortColumn(0)}>{`${this.props.dataSort.prices.arrows[0]} Coin`}</p>
                    <p className="sortable-column" onClick={() => this.handleSortColumn(1)}>{`${this.props.dataSort.prices.arrows[1]} Price/Change ${this.props.dataSort.prices.arrows[2]}`}</p>
                </div>
                <div className="watchlist-assets">
                    {coins}
                </div>
            </div>
        )
    }
}