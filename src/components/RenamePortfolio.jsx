import React, { Component } from 'react';

export default class RenamePortfolio extends Component {

    state = {
        portfolioName: ""
    }

    componentDidMount() {
        this.setState({
            portfolioName: this.props.loggedInUser.portfolios[this.props.currentPortfolio].name
        });
    }

    handleNameInputChange = (e) => {
        const value = e.target.value.length <= 20 ? e.target.value : e.target.value.slice(0, 20);
        this.setState({
            portfolioName: value
        });
    }

    handleClickRenameButton = () => {
        if (this.state.portfolioName) {
            this.props.renamePortfolio(this.state.portfolioName);
        } else {
            alert("You need to add a name in the Name field first.");
        }
    }

    handleClickCloseButton = () => {
        this.props.clearErrorMessage();
        this.props.makePopupVisible("EditPortfolio", false);
    }

    render() {

        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";

        return (
            <div>
                <div className="edit-portfolio-input-container">
                    <div className="edit-portfolio-input-description">
                        <h2 className="edit-portfolio-input-description-title">Rename portfolio</h2>
                        <p className="edit-portfolio-input-description-text">
                            To rename the portfolio, edit the name in the Name field, then click Rename.
                        </p>
                    </div>
                    <div className="edit-portfolio-input">
                        <div className="edit-portfolio-input-item">
                            <label className="edit-portfolio-input-label" htmlFor="name-input">Name</label>
                            <input type="text" name="name-input" className="edit-portfolio-input-field"
                                value={this.state.portfolioName}
                                onChange={this.handleNameInputChange} >
                            </input>
                        </div>
                    </div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                <div className="edit-portfolio-button-container">
                    <button type="button" className="edit-portfolio-button" onClick={this.handleClickRenameButton}>Rename</button>
                    <button type="button" className="edit-portfolio-button" onClick={this.handleClickCloseButton}>Close</button>
                </div>
            </div>
        )
    }
}