import React, { Component } from 'react';

export default class SellCurrentAsset extends Component {

    state = {
        symbol: "",
        quantity: 0,
        price: 0,
        date: "",
    }

    componentDidMount() {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const coin = this.props.coinFinder(currentAsset.coin_id);
        const date = new Date().toISOString().substring(0, 10);
        this.setState({
            symbol: coin.symbol,
            quantity: Number.parseFloat(currentAsset.current_quantity.toFixed(coin.quantity_scale)),
            price: Number.parseFloat(coin.price_eur.toFixed(coin.price_scale)),
            date: date,
        });
    }

    handleQuantityInputChange = (e) => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const coin = this.props.coinFinder(currentAsset.coin_id);
        const value = this.props.inputDecimalSetter(e.target.value, coin.quantity_scale);
        this.setState({
            quantity: value
        });
    };

    handlePriceInputChange = (e) => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const coin = this.props.coinFinder(currentAsset.coin_id);
        const value = this.props.inputDecimalSetter(e.target.value, coin.price_scale);
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

    handleClickSellButton = () => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const selectedAssetTransactions = currentPortfolio.transactions.filter(transaction => transaction.coin_id === currentAsset.coin_id);
        selectedAssetTransactions.push(
            {
                "buy_sell": 1,
                "quantity": this.state.quantity,
                "price": this.state.price,
                "date": this.state.date
            }
        )
        if (this.props.transactionQuantityChecker(selectedAssetTransactions)) {
            alert(`Sell unsuccessful. The total quantity of the asset would be less than zero at some date.`);
        } else {
            const id = currentAsset.coin_id;
            const quantity = currentAsset.current_quantity;
            const currentDate = new Date();
            const purchaseDate = new Date(this.state.date);
            if (this.state.quantity <= 0 || this.state.quantity > quantity || this.state.price <= 0 || purchaseDate > currentDate) {
                alert("Some of the data are invalid, check and correct any invalid data:\n- quantity and purchase price should be > 0,\n- quantity cannot be more than available quantity,\n- purchase date cannot be in the future.");
            } else {
                this.props.addTransactionToPortfolio(id, 1, this.state.quantity, this.state.price, this.state.date);
                const coin = this.props.coinFinder(id);
                this.setState({
                    quantity: (quantity * coin.quantity_scale * 10 - this.state.quantity * coin.quantity_scale * 10) / (coin.quantity_scale * 10),
                    price: coin.price_eur,
                });
            }
        }
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];

        return (
            <div>
                <div className="edit-portfolio-input-container">
                    <div className="edit-portfolio-input-description">
                        <h2 className="edit-portfolio-input-description-title">Sell asset</h2>
                        <p className="edit-portfolio-input-description-text">
                            To sell the asset, change the quantity, price and date as necessary, then click Sell.
                        </p>
                    </div>
                    <div className="edit-portfolio-input">
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="ticker-list">Coin</label>
                            <input type="text" name="ticker-input" className="edit-portfolio-input-field" value={this.state.symbol} readOnly></input>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="quantity-input">Quantity</label>
                            <input type="number" name="quantity-input" className="edit-portfolio-input-field" min="0"
                                step={`1e-${this.props.coinFinder(currentAsset.coin_id).quantity_scale}`}
                                value={this.state.quantity}
                                onChange={this.handleQuantityInputChange}>
                            </input>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="buyprice-input">Price (€)</label>
                            <input type="number" name="buyprice-input" className="edit-portfolio-input-field" min="0"
                                step={`1e-${this.props.coinFinder(currentAsset.coin_id).price_scale}`}
                                value={this.state.price}
                                onChange={this.handlePriceInputChange}>
                            </input>
                        </div>
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="buydate-input">Date</label>
                            <input type="date" name="buydate-input" className="edit-portfolio-input-field" min="2010-01-01"
                                value={this.state.date}
                                onChange={this.handleDateInputChange}>
                            </input>
                        </div>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-portfolio-button-container">
                    <button type="button" className="edit-portfolio-button" onClick={this.handleClickSellButton}>Sell</button>
                    <button type="button" className="edit-portfolio-button" onClick={() => this.props.makePopupVisible("EditAsset", false)}>Close</button>
                </div>
            </div>
        )
    }
}