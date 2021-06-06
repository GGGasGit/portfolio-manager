import './Guides.css';
import React, { Component } from 'react';

export default class PricesGuide extends Component {

    render() {
        //console.log(this.props.loggedInUser)

        return (
            <div className="guide-background">
                <div className="guide-popup">
                    <div className="guide-close">
                        <p><i className="fa fa-times" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesGuide", false)}></i></p>
                    </div>
                    <div className="guide-text">
                        <h2 className="guide-main-header">Crypto Portfolio Manager Guide</h2>
                        <h3 className="guide-page-header">Prices Page</h3>
                        <p className="guide-normal-text">The Crypto Portfolio Manager is divided into two main pages, Prices and Portfolios.
                            You can change between them by clicking on the Prices/Portfolios links.
                        </p>
                        <p className="guide-normal-text">On the Prices page, you can manage your watchlists. Watchlists are lists of coins
                            you include to monitor their price change. When you register, you are assigned
                            a Default watchlist that consists of Bitcoin (BTC), Ethereum (ETH) and USDT.
                            You can manage your watchlists with the menu below the Prices/Portfolios links by:</p>
                        <ul className="guide-list">
                            <li>adding new watchlists - <i className="fa fa-plus-square" aria-hidden="true"></i></li>
                            <li>editing your created watchlists - <i className="fa fa-pencil" aria-hidden="true"></i></li>
                            <li>selecting from already created watchlists (dropdown menu)</li>
                            <li>setting your preferred viewing currency (EUR, USD) - <i className="fa fa-cog" aria-hidden="true"></i></li>
                        </ul>
                        <h4 className="guide-subheader">Add Watchlist - <i className="fa fa-plus-square" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">In the Add Watchlist popup, enter a name for your new watchlist you would like to create,
                            then click the Add button. Watchlist names should be unique.
                        </p>
                        <h4 className="guide-subheader">Edit Watchlist - <i className="fa fa-pencil" aria-hidden="true"></i></h4>
                        <p className="guide-normal-text">The Edit Watchlist popup always effects the selected watchlist. If you added a new watchlist,
                            and have more than one, you can select between them using the dropdown list.
                            The Edit Watchlist popup lets you manage the coins in the selected watchlist, rename the watchlist
                            or delete the watchlist. There is a menu row for you to select the action you would like to carry out.
                        </p>
                        <p className="guide-normal-text"><b>Adding a new coin:</b></p>
                        <p className="guide-normal-text">Click on the Manage Coins menu item, then click in the Add coin dropdown list, and select the coin you would like to add to your watchlist.
                            Then click the Add button. You may also type in the field to narrow the search before clicking on any of the items.
                        </p>
                        <p className="guide-normal-text"><b>Removing a coin:</b></p>
                        <p className="guide-normal-text">If you don't need one of the coins in your watchlist any more, you can remove it by clicking
                            the trashcan <i className="fa fa-trash" aria-hidden="true"></i> icon next to it.
                        </p>
                        <p className="guide-normal-text"><b>Rename watchlist:</b></p>
                        <p className="guide-normal-text">Click on the Rename menu item, change the name of your watchlist in the Name field,
                            then click the Rename button.
                        </p>
                        <p className="guide-normal-text"><b>Delete watchlist:</b></p>
                        <p className="guide-normal-text">If you don't need a watchlist any more, click on the Delete menu item, then click the Delete button.
                            The watchlist will be deleted permanently, meaning that if you still need it, you will have
                            to create the watchlist and add the coins to it again.
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
                        <h4 className="guide-subheader">Sorting</h4>
                        <p className="guide-normal-text">Coins in your watchlist can be sorted by clicking on the column headers. Click on the Coin header to sort
                            by name (ascending order). Click on it again to sort in descending order. Click on the Price/Change header
                            to sort by price or price change. Price change is for the last 24 hours. An arrow appears near the property
                            used for sorting and shows the direction of sorting (up arrow ascending, down arrow descending).
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}