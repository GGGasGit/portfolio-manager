import React, { Component } from 'react';

export default class EditTransaction extends Component {

    state = {
        symbol: "",
        buysell: "",
        quantity: 0,
        quantity_scale: 8,
        price: 0,
        price_scale: 8,
        date: "",
    }

    componentDidMount() {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentTransaction = currentPortfolio.transactions[this.props.currentTransaction];
        const coin = this.props.coinFinder(currentTransaction.coin_id);
        this.setState({
            symbol: coin.symbol,
            buysell: currentTransaction.buy_sell === 0 ? "Buy" : "Sell",
            quantity: currentTransaction.quantity,
            quantity_scale: coin.quantity_scale,
            price: currentTransaction.price,
            price_scale: coin.price_scale,
            date: currentTransaction.date,
        });
    }

    handleQuantityInputChange = (e) => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentTransaction = currentPortfolio.transactions[this.props.currentTransaction];
        const coin = this.props.coinFinder(currentTransaction.coin_id);
        const value = this.props.inputDecimalSetter(e.target.value, coin.quantity_scale);
        this.setState({
            quantity: Number.parseFloat(value)
        });
    };

    handlePriceInputChange = (e) => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentTransaction = currentPortfolio.transactions[this.props.currentTransaction];
        const coin = this.props.coinFinder(currentTransaction.coin_id);
        const value = this.props.inputDecimalSetter(e.target.value, coin.price_scale);
        this.setState({
            price: Number.parseFloat(value)
        });
    };

    handleDateInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            date: value
        });
    };

    handleClickEditButton = () => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const currentTransaction = currentPortfolio.transactions[this.props.currentTransaction];
        const checkedTransactions = currentPortfolio.transactions
            .filter(transaction => transaction.coin_id === currentAsset.coin_id)
            .filter(transaction => transaction.id !== currentTransaction.id);
        checkedTransactions.push(
            {
                "buy_sell": currentTransaction.buy_sell,
                "quantity": this.state.quantity,
                "price": this.state.price,
                "date": this.state.date
            }
        )
        
        if (this.props.transactionQuantityChecker(checkedTransactions)) {
            alert(`Modification unsuccessful. The total quantity of the asset would be less than zero at some date after this modification.`);
        } else {
            const currentDate = new Date();
            const transactionDate = new Date(this.state.date);
            if (this.state.quantity <= 0 || this.state.price <= 0 || transactionDate > currentDate) {
                alert("Some of the data are invalid, check and correct any invalid data:\n- quantity and price should be > 0,\n- quantity after the edit cannot be < 0,\n- date cannot be in the future.");
            } else {
                this.props.editTransaction(this.state.quantity, this.state.price, this.state.date);
            }
        }
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div className="edit-portfolio-background">
                <div className="edit-portfolio-popup">
                    <div className="edit-portfolio-popup-title">
                        <p className="edit-portfolio-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit transaction - {this.state.symbol} / {this.state.buysell}</p>
                    </div>
                    <div className="edit-portfolio-input-container">
                        <div className="edit-portfolio-input-description">
                            <h2 className="edit-portfolio-input-description-title">Edit transaction</h2>
                            <p className="edit-portfolio-input-description-text">
                                To edit the transaction, change the quantity, price and date as necessary, then click Edit.
                        </p>
                        </div>
                        <div className="edit-portfolio-input">
                            <div className="edit-portfolio-input-item">
                                <label className="edit-portfolio-input-label" htmlFor="ticker-input">Coin</label>
                                <input type="text" name="ticker-input" className="edit-portfolio-input-field" value={this.state.symbol} readOnly></input>
                            </div>
                            <div className="edit-portfolio-input-item">
                                <label className="edit-portfolio-input-label" htmlFor="buysell-input">Buy/Sell</label>
                                <input type="text" name="buysell-input" className="edit-portfolio-input-field" value={this.state.buysell} readOnly></input>
                            </div>
                            <div className="edit-portfolio-input-item">
                                <label className="edit-portfolio-input-label" htmlFor="quantity-input">Quantity</label>
                                <input type="number" name="quantity-input" className="edit-portfolio-input-field" min="0"
                                    step={`1e-${this.state.quantity_scale}`}
                                    value={this.state.quantity}
                                    onChange={this.handleQuantityInputChange}>
                                </input>
                            </div>
                            <div className="edit-portfolio-input-item">
                                <label className="edit-portfolio-input-label" htmlFor="price-input">Price</label>
                                <input type="number" name="price-input" className="edit-portfolio-input-field" min="0"
                                    step={`1e-${this.state.price_scale}`}
                                    value={this.state.price}
                                    onChange={this.handlePriceInputChange}>
                                </input>
                            </div>
                            <div className="edit-portfolio-input-item">
                                <label className="edit-portfolio-input-label" htmlFor="date-input">Date</label>
                                <input type="date" name="date-input" className="edit-portfolio-input-field" min="2010-01-01"
                                    value={this.state.date}
                                    onChange={this.handleDateInputChange}>
                                </input>
                            </div>
                        </div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                    <div className="edit-portfolio-button-container">
                        <button type="button" className="edit-portfolio-button" onClick={this.handleClickEditButton}>Edit</button>
                        <button type="button" className="edit-portfolio-button" onClick={() => this.props.makePopupVisible("EditTransaction", false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

