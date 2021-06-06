import './EditPopups.css';
import './EditWatchlist.css';
import React, { Component } from 'react';
import ManageCoins from './ManageCoins';
import RenameWatchlist from './RenameWatchlist';
import DeleteWatchlist from './DeleteWatchlist';

export default class EditWatchlist extends Component {

    state = {
        page: "Manage",
    }

    handleTabChange = (newpage) => {
        this.props.clearErrorMessage();
        this.setState({
            page: newpage
        });
    }

    render() {

        let Page = "";
        let manageClass = "popup-menu-item popup-menu-item-active";
        let renameClass = "popup-menu-item";
        let deleteClass = "popup-menu-item";

        if (this.state.page === "Manage") {
            Page = <ManageCoins errorMessage={this.props.errorMessage}
                clearErrorMessage={this.props.clearErrorMessage}
                makePopupVisible={this.props.makePopupVisible}
                coins={this.props.coins}
                coinListCreator={this.props.coinListCreator}
                deleteWatchlistItem={this.props.deleteWatchlistItem}
                addWatchlistItem={this.props.addWatchlistItem}
                compareFunction={this.props.compareFunction}
            />
        }

        if (this.state.page === "Rename") {
            Page = <RenameWatchlist errorMessage={this.props.errorMessage}
                clearErrorMessage={this.props.clearErrorMessage}
                renameWatchlist={this.props.renameWatchlist}
                makePopupVisible={this.props.makePopupVisible}
                loggedInUser={this.props.loggedInUser}
                currentWatchlist={this.props.currentWatchlist}
            />
            manageClass = "popup-menu-item";
            renameClass = "popup-menu-item popup-menu-item-active";
            deleteClass = "popup-menu-item";
        }

        if (this.state.page === "Delete") {
            Page = <DeleteWatchlist errorMessage={this.props.errorMessage}
                makePopupVisible={this.props.makePopupVisible}
                loggedInUser={this.props.loggedInUser}
                currentWatchlist={this.props.currentWatchlist}
                deleteWatchlist={this.props.deleteWatchlist}
            />
            manageClass = "popup-menu-item";
            renameClass = "popup-menu-item";
            deleteClass = "popup-menu-item popup-menu-item-active";
        }

        return (
            <div className="popup-background">
                <div className="popup-foreground">
                    <div className="popup-title">
                        <p className="popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit Watchlist - {this.props.loggedInUser.watchlists[this.props.currentWatchlist].name}</p>
                    </div>
                    <div className="popup-description">
                        <p>On the Manage Coins tab, you can add new coins to your watchlist or remove coins.
                            You can rename or delete the current watchlist on the Rename or Delete tab.
                        </p>
                    </div>
                    <nav>
                        <ul className="popup-menu-container">
                            <li className={manageClass} onClick={() => this.handleTabChange("Manage")}>Manage Coins</li>
                            <li className={renameClass} onClick={() => this.handleTabChange("Rename")}>Rename</li>
                            <li className={deleteClass} onClick={() => this.handleTabChange("Delete")}>Delete</li>
                        </ul>
                    </nav>
                    {Page}
                </div>
            </div>
        )
    }
}