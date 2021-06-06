import './EditPopups.css';
import React, { Component } from 'react';
import RenamePortfolio from './RenamePortfolio';
import DeletePortfolio from './DeletePortfolio';

export default class EditPortfolio extends Component {

    state = {
        page: "Rename",
    }

    handleTabChange = (newpage) => {
        this.props.clearErrorMessage();
        this.setState({
            page: newpage
        });
    }

    render() {

        let Page = "";
        let renameClass = "popup-menu-item";
        let deleteClass = "popup-menu-item";

        if (this.state.page === "Rename") {
            Page = <RenamePortfolio errorMessage={this.props.errorMessage}
                clearErrorMessage={this.props.clearErrorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                makePopupVisible={this.props.makePopupVisible}
                renamePortfolio={this.props.renamePortfolio}
            />
            renameClass = "popup-menu-item popup-menu-item-active";
            deleteClass = "popup-menu-item";
        }

        if (this.state.page === "Delete") {
            Page = <DeletePortfolio errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                makePopupVisible={this.props.makePopupVisible}
                deletePortfolio={this.props.deletePortfolio}
            />
            renameClass = "popup-menu-item";
            deleteClass = "popup-menu-item popup-menu-item-active";
        }

        return (
            <div className="popup-background">
                <div className="popup-foreground">
                    <div className="popup-title">
                        <p className="popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit Portfolio - {this.props.loggedInUser.portfolios[this.props.currentPortfolio].name}</p>
                    </div>
                    <div className="popup-description">
                        <p>You can rename or delete the current portfolio.</p>
                    </div>
                    <nav>
                        <ul className="popup-menu-container">
                            
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