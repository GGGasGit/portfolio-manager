import './EditAsset.css';
import React, { Component } from 'react';
import AssetDetails from './AssetDetails';
import Transactions from './Transactions';
import SellCurrentAsset from './SellCurrentAsset';
import DeleteAsset from './DeleteAsset';

export default class EditAsset extends Component {

    state = {
        page: "Details",
    }

    handleTabChange = (newpage) => {
        this.setState({
            page: newpage
        });
    }

    render() {

        let Page = "";
        let detailsClass = "edit-asset-menu-item edit-asset-menu-item-active";
        let transactionsClass = "edit-asset-menu-item";
        let sellClass = "edit-asset-menu-item";
        let deleteClass = "edit-asset-menu-item";

        if (this.state.page === "Details") {
            Page = <AssetDetails makePopupVisible={this.props.makePopupVisible}
                errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                currentAsset={this.props.currentAsset}
                coinFinder={this.props.coinFinder}
                priceConverter={this.props.priceConverter}
                valueConverter={this.props.valueConverter}
                amountConverter={this.props.amountConverter}
                priceColorSetter={this.props.priceColorSetter}
            />
        }

        if (this.state.page === "Transactions") {
            Page = <Transactions makePopupVisible={this.props.makePopupVisible}
                errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                currentAsset={this.props.currentAsset}
                coinFinder={this.props.coinFinder}
                deleteTransaction={this.props.deleteTransaction}
                setCurrentIndex={this.props.setCurrentIndex}
                compareFunction={this.props.compareFunction}
                valueConverter={this.props.valueConverter}
                transactionQuantityChecker={this.props.transactionQuantityChecker}
            />
            detailsClass = "edit-asset-menu-item";
            transactionsClass = "edit-asset-menu-item edit-asset-menu-item-active";
            sellClass = "edit-asset-menu-item";
            deleteClass = "edit-asset-menu-item";
        }

        if (this.state.page === "Sell") {
            Page = <SellCurrentAsset makePopupVisible={this.props.makePopupVisible}
                errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                currentAsset={this.props.currentAsset}
                coinFinder={this.props.coinFinder}
                addTransactionToPortfolio={this.props.addTransactionToPortfolio}
                transactionQuantityChecker={this.props.transactionQuantityChecker}
                inputDecimalSetter={this.props.inputDecimalSetter}
            />
            detailsClass = "edit-asset-menu-item";
            transactionsClass = "edit-asset-menu-item";
            sellClass = "edit-asset-menu-item edit-asset-menu-item-active";
            deleteClass = "edit-asset-menu-item";
        }

        if (this.state.page === "Delete") {
            Page = <DeleteAsset makePopupVisible={this.props.makePopupVisible}
                errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                currentAsset={this.props.currentAsset}
                coinFinder={this.props.coinFinder}
                deleteAsset={this.props.deleteAsset}
            />
            detailsClass = "edit-asset-menu-item";
            transactionsClass = "edit-asset-menu-item";
            sellClass = "edit-asset-menu-item";
            deleteClass = "edit-asset-menu-item edit-asset-menu-item-active";
        }

        return (
            <div className="edit-asset-background">
                <div className="edit-asset-popup">
                    <div className="edit-asset-popup-title">
                        <p className="edit-asset-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit Asset - {this.props.coinFinder(this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets[this.props.currentAsset].coin_id).coinName}</p>
                    </div>
                    <div className="edit-asset-popup-description">
                        <p>You can see all the details of the current asset and its transactions, or you can sell or delete the asset.</p>
                    </div>
                    <nav>
                        <ul className="edit-asset-menu-container">
                            <li className={detailsClass} onClick={() => this.handleTabChange("Details")}>Details</li>
                            <li className={transactionsClass} onClick={() => this.handleTabChange("Transactions")}>Transactions</li>
                            <li className={sellClass} onClick={() => this.handleTabChange("Sell")}>Sell</li>
                            <li className={deleteClass} onClick={() => this.handleTabChange("Delete")}>Delete</li>
                        </ul>
                    </nav>
                    {Page}
                </div>
            </div>
        )
    }
}