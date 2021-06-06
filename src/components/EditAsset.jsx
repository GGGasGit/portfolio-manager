import './EditAsset.css';
import './EditPopups.css';
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
        let detailsClass = "popup-menu-item popup-menu-item-active";
        let transactionsClass = "popup-menu-item";
        let sellClass = "popup-menu-item";
        let deleteClass = "popup-menu-item";

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
            detailsClass = "popup-menu-item";
            transactionsClass = "popup-menu-item popup-menu-item-active";
            sellClass = "popup-menu-item";
            deleteClass = "popup-menu-item";
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
            detailsClass = "popup-menu-item";
            transactionsClass = "popup-menu-item";
            sellClass = "popup-menu-item popup-menu-item-active";
            deleteClass = "popup-menu-item";
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
            detailsClass = "popup-menu-item";
            transactionsClass = "popup-menu-item";
            sellClass = "popup-menu-item";
            deleteClass = "popup-menu-item popup-menu-item-active";
        }

        return (
            <div className="popup-background">
                <div className="popup-foreground">
                    <div className="popup-title">
                        <p className="popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit Asset - {this.props.coinFinder(this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets[this.props.currentAsset].coin_id).coinName}</p>
                    </div>
                    <div className="popup-description">
                        <p>You can see all the details of the current asset and its transactions, or you can sell or delete the asset.</p>
                    </div>
                    <nav>
                        <ul className="popup-menu-container">
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