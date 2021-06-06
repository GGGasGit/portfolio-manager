import './EditPopups.css';
import './BuySellAsset.css';
import React, { Component } from 'react';
import BuyAsset from './BuyAsset';
import SellAsset from './SellAsset';

export default class BuySellAsset extends Component {

    state = {
        page: "Buy",
    }

    handleTabChange = (newpage) => {
        this.setState({
            page: newpage
        });
    }

    render() {

        let Page = "";
        let buyClass = "popup-menu-item popup-menu-item-active";
        let sellClass = "popup-menu-item";

        if (this.state.page === "Buy") {
            Page = <BuyAsset errorMessage={this.props.errorMessage}
                coins={this.props.coins}
                makePopupVisible={this.props.makePopupVisible}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                coinFinder={this.props.coinFinder}
                addTransactionToPortfolio={this.props.addTransactionToPortfolio}
                compareFunction={this.props.compareFunction}
                inputDecimalSetter={this.props.inputDecimalSetter}
            />
        }

        if (this.state.page === "Sell") {
            Page = <SellAsset errorMessage={this.props.errorMessage} 
                coins={this.props.coins}
                makePopupVisible={this.props.makePopupVisible}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                coinFinder={this.props.coinFinder}
                addTransactionToPortfolio={this.props.addTransactionToPortfolio}
                compareFunction={this.props.compareFunction}
                transactionQuantityChecker={this.props.transactionQuantityChecker}
                inputDecimalSetter={this.props.inputDecimalSetter}
            />
            buyClass = "popup-menu-item";
            sellClass = "popup-menu-item popup-menu-item-active";
        }

        return (
            <div className="popup-background">
                <div className="popup-foreground">
                    <div className="popup-title">
                        <p className="popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Buy/Sell Asset - {this.props.loggedInUser.portfolios[this.props.currentPortfolio].name}</p>
                    </div>
                    <div className="popup-description">
                        <p>You can buy and sell assets in the current portfolio.</p>
                    </div>
                    <nav>
                        <ul className="popup-menu-container">
                            <li className={buyClass} onClick={() => this.handleTabChange("Buy")}>Buy Asset</li>
                            <li className={sellClass} onClick={() => this.handleTabChange("Sell")}>Sell Asset</li>
                        </ul>
                    </nav>
                    {Page}
                </div>
            </div>
        )
    }
}