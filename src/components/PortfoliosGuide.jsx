import './Guides.css';
import React, { Component } from 'react';

export default class PortfoliosGuide extends Component {

    render() {

        return (
            <div className="guide-background">
                <div className="guide-popup">
                    <div className="guide-close">
                        <p><i className="fa fa-times" aria-hidden="true" onClick={() => this.props.makePopupVisible("PortfoliosGuide", false)}></i></p>
                    </div>
                    <div className="guide-text">
                        <h2 className="guide-main-header">Crypto Portfolio Manager Guide</h2>
                        <h3 className="guide-page-header">Portfolios Page</h3>
                        <p className="guide-normal-text">The Crypto Portfolio Manager is divided into two main pages, Prices and Portfolios.
                            You can change between them by clicking on the Prices/Portfolios links.
                        </p>
                        <p className="guide-normal-text">On the Portfolios page, you can manage your portfolios.
                            Portfolios consist of assets, which in turn are made up of buy and sell transactions in coins.
                            When you register, you are assigned an empty Default portfolio.
                            You can manage your portfolios with the menu below the Prices/Portfolios links by:</p>
                        <ul className="guide-list">
                            <li>adding new portfolios - <i className="fa fa-plus-square" aria-hidden="true"></i></li>
                            <li>editing your created portfolios - <i className="fa fa-pencil" aria-hidden="true"></i></li>
                            <li>selecting from already created portfolios (dropdown menu)</li>
                            <li>setting your preferred viewing currency (EUR, USD) - <i className="fa fa-cog" aria-hidden="true"></i></li>
                            <li>creating buy and sell transactions in the selected portfolio - <i className="fa fa-money" aria-hidden="true"></i></li>
                            <li>editing assets and transactions in the selected portfolio - <i className="fa fa-ellipsis-v" aria-hidden="true"></i></li>
                        </ul>
                        <h4 className="guide-subheader">Add Portfolio - <i className="fa fa-plus-square" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">In the Add Portfolio popup, enter a name for your new portfolio you would like to create,
                            then click the Add button. Portfolio names should be unique.
                        </p>
                        <h4 className="guide-subheader">Edit Portfolio - <i className="fa fa-pencil" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">The Edit Portfolio popup always effects the selected portfolio.
                            If you added a new portfolio, and have more than one, you can select between them using the dropdown list.
                            The Edit Portfolio popup lets you rename or delete the watchlist.
                            There is a menu row for you to select the action you would like to carry out.
                        </p>
                        <p className="guide-normal-text"><b>Rename portfolio:</b></p>
                        <p className="guide-normal-text">Click on the Rename menu item, change the name of your portfolio in the Name field,
                            then click the Rename button.
                        </p>
                        <p className="guide-normal-text"><b>Delete portfolio:</b></p>
                        <p className="guide-normal-text">If you don't need a portfolio any more, click on the Delete menu item, then click the Delete button.
                            The portfolio will be deleted permanently, meaning that if you still need it, you will have
                            to create the portfolio and add the assets/transactions to it again.
                        </p>
                        <p className="guide-normal-text">If you finished editing your watchlist, close the popup window with the Close button.</p>
                        <h4 className="guide-subheader">Select Currency - <i className="fa fa-cog" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">To select your viewing currency, click on the cogwheel icon to open the Select Currency popup.
                            You may change between EUR and USD in the Currency dropdown list.
                            Note: the Portfolio Manager's basic currency is EUR. Prices and portfolio transactions
                            are registered in EUR. When you change to USD, the portfolio manager will show you all prices and amounts
                            in USD based on the current EUR/USD exchange price for your convenience,
                            but all the portfolios are EUR based portfolios and transactions (buys and sells) are registered in EUR.
                        </p>
                        <h4 className="guide-subheader">Buy/Sell Asset - <i className="fa fa-money" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">This is where you can buy coins into your portfolio, or sell previously bought coins.
                            The basic unit of this portfolio manager are transactions, which means that any asset in your portfolio
                            is made up of transactions in coins. You can have as many transactions in a portfolio in one coin as you would like,
                            and they will show up as one asset.</p>
                        <p className="guide-normal-text">To buy a coin, select it from the dropdown list first. You can also type in the Coin field to narrow the list.
                            After selecting the coin, the other input fields become editable. Price and date fields will show the current price and date.
                            Enter the purchased quantity, change the purchase price and the purchase date as required, then click Buy.
                            The portfolio manager will warn you for errors and ommissions (e.g. you can't buy 0 coins).</p>
                        <p className="guide-normal-text">To sell a coin, select the coin you would like to sell. The portfolio manager will only offer you the list of coins
                            you currently have in the selected portfolio, that is, it doesn't manage short selling. After the selection,
                            all the other fields will become enabled and show you current quantity, price and date. Edit them as required,
                            then clisk Sell.</p>
                        <p className="guide-normal-text">If you are done, click the Close button to close the Buy/Sell Asset popup window.</p>
                        
                        <h4 className="guide-subheader">Sorting</h4>
                        <p className="guide-normal-text">Assets in your portfolio can be sorted by clicking on the column headers.
                            Click on the Coin header to sort by name (ascending order). Click on it again to sort in descending order.
                            You can also sort by asset value, current asset amount (position) as well as absolute and % asset yield in the same manner.
                            An arrow appears near the property used for sorting and shows the direction of sorting (up arrow ascending, down arrow descending).
                        </p>
                        <h4 className="guide-subheader">Edit Asset</h4>
                        <p className="guide-normal-text">The Details tab of the Edit Asset popup window shows you detailed information about the asset
                            and all the transactions in it. It also lets you sell or delete the selected asset.
                            Selling works the same way as in the Buy/Sell Assets. To Delete an asset and all the related transactions,
                            click on the Delete button. Note: this will delete all transactions done in this asset. You can edit and delete
                            transaction individually to. See below.
                        </p>
                        <h4 className="guide-subheader">Edit Transactions</h4>
                        <p className="guide-normal-text">When you click on the Transactions menu item, all the transactions done in the
                            given asset is displayed sorted by date.</p>
                        <p className="guide-normal-text">To edit a transaction, click on the pencil icon <i className="fa fa-pencil" aria-hidden="true"></i>.
                            The Edit Transaction popup window appears. You can only change the quantity, the price and/or the date.
                            The portfolio manager will check the consistency of new and edited transactions with all the other
                            transactions made in the given asset, and warn you for errors and ommissions.
                        </p>
                        <p className="guide-normal-text">To delete a transaction, click on the trashcan <i className="fa fa-trash" aria-hidden="true"></i> icon.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}