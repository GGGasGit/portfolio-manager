import React, { Component } from 'react';

export default class Transactions extends Component {

    handleClickEditTransactionIcon = (id) => {
        const index = this.props.loggedInUser.portfolios[this.props.currentPortfolio].transactions.findIndex(transaction => transaction.id === id);
        this.props.setCurrentIndex(index, "transaction");
        this.props.makePopupVisible("EditTransaction", true);
    }

    handleClickDeleteTransactionIcon = (transaction) => {
        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        if (transaction.buy_sell === 0) {
            const checkedTransactions = currentPortfolio.transactions
                .filter(trans => trans.coin_id === transaction.coin_id)
                .filter(trans => trans.id !== transaction.id);
            if (this.props.transactionQuantityChecker(checkedTransactions)) {
                alert(`This transaction cannot be deleted, only modified. The total quantity of the asset at the date of the transaction would be less than zero after deleting it.`);
            } else {
                this.props.deleteTransaction(transaction.id);
                if (currentPortfolio.transactions.length === 1) {
                    this.props.makePopupVisible("EditAsset", false);
                }
            }
        } else {
            this.props.deleteTransaction(transaction.id);
            if (currentPortfolio.transactions.length === 1) {
                this.props.makePopupVisible("EditAsset", false);
            }
        }
    }

    render() {

        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        const assetTransactions = [...currentPortfolio.transactions]
            .filter(transaction => transaction.coin_id === currentAsset.coin_id)
            .sort(this.props.compareFunction("date", true))
            .map(transaction =>
                <div key={transaction.id} className="edit-asset-details-transaction-item-container">
                    <p className="edit-asset-details-transaction-item-date">{transaction.date}</p>
                    <div className="edit-asset-details-transaction-item">
                        <p className="edit-asset-details-transaction-buysell">{transaction.buy_sell === 0 ? "Buy" : "Sell"}</p>
                        <p className="edit-asset-details-transaction-quantity">{transaction.quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(transaction.coin_id).quantity_scale })}</p>
                        <p className="edit-asset-details-transaction-price">{this.props.valueConverter(transaction.price, this.props.coinFinder(transaction.coin_id))}</p>
                        <div className="edit-asset-details-transaction-item-icon-container">
                            <p className="edit-asset-details-transaction-item-icon"><i className="fa fa-pencil" aria-hidden="true" onClick={() => this.handleClickEditTransactionIcon(transaction.id)}></i></p>
                            <p className="edit-asset-details-transaction-item-icon"><i className="fa fa-trash" aria-hidden="true" onClick={() => this.handleClickDeleteTransactionIcon(transaction)}></i></p>
                        </div>
                    </div>
                </div>
            )

        return (
            <div>
                <div className="edit-popup-input-container">
                    <div className="edit-popup-input-description">
                        <h2 className="edit-popup-input-description-title">Transactions</h2>
                        <p className="edit-popup-input-description-text">
                            This page shows you all the transactions you made in this asset.
                            You can also modify or delete a transaction here.
                        </p>
                    </div>
                    <div className="edit-asset-details-container">
                        <div className="edit-asset-details-name-container">
                            <p className="edit-asset-details-icon"><img src={this.props.coinFinder(currentAsset.coin_id).logo} alt={`${this.props.coinFinder(currentAsset.coin_id).symbol} icon`} /></p>
                            <p className="edit-asset-details-name">{this.props.coinFinder(currentAsset.coin_id).symbol} - {this.props.coinFinder(currentAsset.coin_id).coinName}</p>
                        </div>
                        <div className="edit-asset-details-transactions-header">
                            <p className="edit-asset-input-description-text"></p>
                            <p className="edit-asset-input-description-text">Qty</p>
                            <p className="edit-asset-input-description-text">Price</p>
                        </div>
                        <div className="edit-asset-details-transactions-container">
                            {assetTransactions}
                        </div>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="popup-button-container">
                    <p></p>
                    <button type="button" className="popup-button" onClick={() => this.props.makePopupVisible("EditAsset", false)}>Close</button>
                </div>
            </div>
        )
    }
}