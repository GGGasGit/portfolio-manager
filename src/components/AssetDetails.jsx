import React, { Component } from 'react';

export default class AssetDetails extends Component {

    render() {

        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];
        const currentAsset = currentPortfolio.assets[this.props.currentAsset];
        const currentValue = currentAsset.current_quantity * this.props.coinFinder(currentAsset.coin_id).price_eur;
        const absoluteYield = Number.parseFloat((currentValue + currentAsset.sold_value - currentAsset.bought_value).toFixed(2));
        const percentageYield = Number.parseFloat(((absoluteYield / currentAsset.bought_value) * 100).toFixed(2));
        const portfolioCurrentValue = Number.parseFloat((currentPortfolio.assets.map(asset => asset.current_quantity * this.props.coinFinder(asset.coin_id).price_eur).reduce((acc, value) => acc + value, 0)).toFixed(2));
        const assetShare = (currentValue / portfolioCurrentValue * 100).toFixed(2);

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div>
                <div className="edit-asset-input-container">
                    <div className="edit-asset-input-description">
                        <h2 className="edit-asset-input-description-title">Asset details</h2>
                        <p className="edit-asset-input-description-text">
                            This page shows you all the details of this asset, its transactions and profit/loss.
                        </p>
                    </div>
                    <div className="edit-asset-details-container">
                        <div className="edit-asset-details-name-container">
                            <p className="edit-asset-details-icon"><img src={this.props.coinFinder(currentAsset.coin_id).logo} alt={`${this.props.coinFinder(currentAsset.coin_id).symbol} icon`} /></p>
                            <p className="edit-asset-details-name">{this.props.coinFinder(currentAsset.coin_id).symbol} - {this.props.coinFinder(currentAsset.coin_id).coinName}</p>
                        </div>
                        <h3 className="edit-asset-details-group-name">Currently in Portfolio</h3>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Current Quantity</p>
                            <p className="edit-asset-details-data">{currentAsset.current_quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(currentAsset.coin_id).quantity_scale })}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Current Price</p>
                            <p className="edit-asset-details-data">{this.props.priceConverter(this.props.coinFinder(currentAsset.coin_id))}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Current Value</p>
                            <p className="edit-asset-details-data">{this.props.amountConverter(currentValue)}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Share in Portfolio</p>
                            <p className="edit-asset-details-data">{assetShare} %</p>
                        </div>
                        <h3 className="edit-asset-details-group-name">Buy Transactions</h3>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Buy Qty</p>
                            <p className="edit-asset-details-data">{currentAsset.total_buy_quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(currentAsset.coin_id).quantity_scale })}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Buy Value</p>
                            <p className="edit-asset-details-data">{this.props.amountConverter(currentAsset.bought_value)}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Buy Avg. Price</p>
                            <p className="edit-asset-details-data">{this.props.valueConverter(currentAsset.total_buy_quantity === 0 ? 0 : (currentAsset.bought_value / currentAsset.total_buy_quantity), this.props.coinFinder(currentAsset.coin_id))}</p>
                        </div>
                        <h3 className="edit-asset-details-group-name">Sell Transactions</h3>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Sell Qty</p>
                            <p className="edit-asset-details-data">{currentAsset.total_sell_quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(currentAsset.coin_id).quantity_scale })}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Sell Value</p>
                            <p className="edit-asset-details-data">{this.props.amountConverter(currentAsset.sold_value)}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Total Sell Avg. Price</p>
                            <p className="edit-asset-details-data">{this.props.valueConverter(currentAsset.total_sell_quantity === 0 ? 0 : (currentAsset.sold_value / currentAsset.total_sell_quantity), this.props.coinFinder(currentAsset.coin_id))}</p>
                        </div>
                        <h3 className="edit-asset-details-group-name">Profit</h3>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Net Profit/Loss</p>
                            <p className={`edit-asset-details-data ${this.props.priceColorSetter(percentageYield)}`}>{this.props.amountConverter(absoluteYield)}</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">Yield</p>
                            <p className={`edit-asset-details-data ${this.props.priceColorSetter(percentageYield)}`}>{percentageYield.toFixed(2)} %</p>
                        </div>
                        <div className="edit-asset-details-item-container">
                            <p className="edit-asset-details-label">APY</p>
                            <p className={`edit-asset-details-data ${this.props.priceColorSetter(percentageYield)}`}>{currentAsset.apy.toFixed(2)} %</p>
                        </div>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-asset-button-container">
                    <p></p>
                    <button type="button" className="edit-asset-button" onClick={() => this.props.makePopupVisible("EditAsset", false)}>Close</button>
                </div>
            </div>
        )
    }
}