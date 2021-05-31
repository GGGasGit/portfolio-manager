import React, { Component } from 'react';

export default class BuyAsset extends Component {

    state = {
        symbol: "",
        symbolInput: "",
        quantity: 0,
        quantity_scale: 8,
        price: 0,
        price_scale: 8,
        date: "",
        disabledInput: "disabled",
    }

    handleSymbolInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            symbol: value.toUpperCase(),
            symbolInput: value.toUpperCase(),
            disabledInput: "disabled",
            quantity: 0,
            quantity_scale: 8,
            price: 0,
            price_scale: 8,
            date: "",
        });
        if (this.props.coins.filter(x => x.symbol === value.toUpperCase()).length > 0) {
            const coin = this.props.coins.filter(x => x.symbol === value.toUpperCase())[0];
            const price = coin.price_eur;
            const date = new Date().toISOString().substring(0, 10);
            this.setState({
                quantity_scale: coin.quantity_scale,
                price: price,
                price_scale: coin.price_scale,
                date: date,
                disabledInput: "",
            });
        }
    };

    handleClickOnListItem = (e) => {
        const value = e.target.value;
        this.setState({
            symbol: value.toUpperCase(),
            symbolInput: "",
        });
    }

    handleQuantityInputChange = (e) => {
        let value = this.props.inputDecimalSetter(e.target.value, 8);
        if (this.props.coins.filter(coin => coin.symbol === this.state.symbol).length > 0 ) {
            const scale = this.props.coins.filter(coin => coin.symbol === this.state.symbol)[0].quantity_scale;
            value = this.props.inputDecimalSetter(e.target.value, scale);
        }
        this.setState({
            quantity: value
        });
    };

    handlePriceInputChange = (e) => {
        let value = this.props.inputDecimalSetter(e.target.value, 8);
        if (this.props.coins.filter(coin => coin.symbol === this.state.symbol).length > 0 ) {
            const scale = this.props.coins.filter(coin => coin.symbol === this.state.symbol)[0].price_scale;
            value = this.props.inputDecimalSetter(e.target.value, scale);
        }
        this.setState({
            price: value
        });
    };

    handleDateInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            date: value
        });
    };

    handleClickBuyButton = () => {
        const id = this.props.coins.filter(x => x.symbol === this.state.symbol).length === 1
            ? this.props.coins.filter(x => x.symbol === this.state.symbol)[0].coinId
            : -1
        const currentDate = new Date();
        const purchaseDate = new Date(this.state.date);
        if (id === -1 || this.state.quantity <= 0 || this.state.price <= 0 || purchaseDate > currentDate) {
            alert("Some of the data are invalid, check and correct any invalid data:\n- symbol should exist (select one from the list),\n- quantity and purchase price should be > 0,\n- purchase date cannot be in the future.");
        } else {
            this.props.addTransactionToPortfolio(id, 0, this.state.quantity, this.state.price, this.state.date);
            this.setState({
                symbol: "",
                symbolInput: "",
                quantity: 0,
                quantity_scale: 8,
                price: 0,
                price_scale: 8,
                date: "",
            });
        }
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        const symbolList = [...this.props.coins]
            .sort(this.props.compareFunction("symbol", true))
            .map(coin => <option className="ticker-item" key={coin.coinId} value={coin.symbol} onClick={this.handleClickOnListItem}>{coin.coinName}</option>);

        const portfolioItems = [...this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets]
            .sort(this.props.compareFunction("symbol", true))
            .map(asset => <div key={asset.coin_id} className="edit-portfolio-asset-item">
                <div className="edit-portfolio-coin-text-container">
                    <div className="edit-portfolio-coin-image"><img src={this.props.coinFinder(asset.coin_id).logo} alt={`${this.props.coinFinder(asset.coin_id).symbol} icon`} /></div>
                    <p className="edit-portfolio-coin-text">{`${this.props.coinFinder(asset.coin_id).symbol}  -  ${asset.current_quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(asset.coin_id).quantity_scale })}`}</p>
                </div>
            </div>);

        return (
            <div>
                <div className="edit-portfolio-input-container">
                    <div className="edit-portfolio-input-description">
                        <h2 className="edit-portfolio-input-description-title">Buy asset</h2>
                        <p className="edit-portfolio-input-description-text">
                            To buy an asset, select the purchased coin and enter the purchased quantity, the purchase price and the purchase date, then click Buy.
                            </p>
                    </div>
                    <div className="edit-portfolio-input">
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="ticker-list">Coin</label>
                            <input type="text" name="ticker-input" className="edit-portfolio-input-field" list="ticker-list"
                                autoComplete="off" value={this.state.symbol}
                                onChange={this.handleSymbolInputChange}>
                            </input>
                            <datalist className="ticker-list" id="ticker-list">{symbolList}</datalist>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="quantity-input">Quantity</label>
                            <input type="number" name="quantity-input" className="edit-portfolio-input-field" min="0"
                                step={`1e-${this.state.quantity_scale}`}
                                value={this.state.quantity}
                                onChange={this.handleQuantityInputChange}
                                disabled={this.state.disabledInput}>
                            </input>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="buyprice-input">Price (€)</label>
                            <input type="number" name="buyprice-input" className="edit-portfolio-input-field" min="0"
                                step={`1e-${this.state.price_scale}`}
                                value={this.state.price}
                                onChange={this.handlePriceInputChange}
                                disabled={this.state.disabledInput}>
                            </input>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="buydate-input">Date</label>
                            <input type="date" name="buydate-input" className="edit-portfolio-input-field" min="2010-01-01"
                                value={this.state.date}
                                onChange={this.handleDateInputChange}
                                disabled={this.state.disabledInput}>
                            </input>
                        </div>
                    </div>
                    <div className="edit-portfolio-asset-container">{portfolioItems}</div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-portfolio-button-container">
                    <button type="button" className="edit-portfolio-button" onClick={this.handleClickBuyButton}>Buy</button>
                    <button type="button" className="edit-portfolio-button" onClick={() => this.props.makePopupVisible("BuySellAsset", false)}>Close</button>
                </div>
            </div>
        )
    }
}