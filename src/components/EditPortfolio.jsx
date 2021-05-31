import './EditPortfolio.css';
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
        let renameClass = "edit-portfolio-menu-item";
        let deleteClass = "edit-portfolio-menu-item";

        if (this.state.page === "Rename") {
            Page = <RenamePortfolio errorMessage={this.props.errorMessage}
                clearErrorMessage={this.props.clearErrorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                makePopupVisible={this.props.makePopupVisible}
                renamePortfolio={this.props.renamePortfolio}
            />
            renameClass = "edit-portfolio-menu-item edit-portfolio-menu-item-active";
            deleteClass = "edit-portfolio-menu-item";
        }

        if (this.state.page === "Delete") {
            Page = <DeletePortfolio errorMessage={this.props.errorMessage}
                loggedInUser={this.props.loggedInUser}
                currentPortfolio={this.props.currentPortfolio}
                makePopupVisible={this.props.makePopupVisible}
                deletePortfolio={this.props.deletePortfolio}
            />
            renameClass = "edit-portfolio-menu-item";
            deleteClass = "edit-portfolio-menu-item edit-portfolio-menu-item-active";
        }

        return (
            <div className="edit-portfolio-background">
                <div className="edit-portfolio-popup">
                    <div className="edit-portfolio-popup-title">
                        <p className="edit-portfolio-popup-title-icon"><i className="fa fa-cog" aria-hidden="true"></i></p>
                        <p>Edit portfolio - {this.props.loggedInUser.portfolios[this.props.currentPortfolio].name}</p>
                    </div>
                    <div className="edit-portfolio-popup-description">
                        <p>You can rename or delete the current portfolio.</p>
                    </div>
                    <nav>
                        <ul className="edit-portfolio-menu-container">
                            
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