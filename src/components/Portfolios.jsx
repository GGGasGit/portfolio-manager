import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Portfolios.css';
import React, { Component } from 'react';

export default class Portfolios extends Component {

    state = {
        portfolioDropdownValue: 0,
    }

    componentDidMount() {
        this.setState({
            portfolioDropdownValue: this.props.currentPortfolio,
        });
    }

    componentDidUpdate() {
        if (this.props.currentPortfolio !== this.state.portfolioDropdownValue) {
            this.setState({
                portfolioDropdownValue: this.props.currentPortfolio,
            });
        }
    }

    handlePortfolioDropdownChange = (e) => {
        const value = Number.parseInt(e.target.value);
        this.setState({
            portfolioDropdownValue: value,
        });
        this.props.setCurrentIndex(value, "portfolio");
    }

    idToIndexConverter = (id) => {
        return this.props.loggedInUser.portfolios.findIndex(portfolio => portfolio.id === id);
    }

    handleAssetDetailsButtonClick = (id) => {
        const index = this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets.findIndex(asset => asset.coin_id === id);
        this.props.setCurrentIndex(index, "asset");
        this.props.makePopupVisible("EditAsset", true);
    }

    handleSortColumn = (colNum) => {
        switch (colNum) {
            case 0:
                this.props.handleDataSort(0, "portfolios", this.props.dataSort.portfolios.isUp, "symbol");
                break;
            case 1:
                if (this.props.dataSort.portfolios.index === 1 && this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(1, "portfolios", true, "current_value");
                } else if (this.props.dataSort.portfolios.index === 1 && !this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(2, "portfolios", false, "current_quantity");
                } else if (this.props.dataSort.portfolios.index === 2 && this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(2, "portfolios", true, "current_quantity");
                } else {
                    this.props.handleDataSort(1, "portfolios", false, "current_value");
                }
                break;
            case 2:
                if (this.props.dataSort.portfolios.index === 3 && this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(3, "portfolios", true, "absolute_yield");
                } else if (this.props.dataSort.portfolios.index === 3 && !this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(4, "portfolios", false, "percentage_yield");
                } else if (this.props.dataSort.portfolios.index === 4 && this.props.dataSort.portfolios.isUp) {
                    this.props.handleDataSort(4, "portfolios", true, "percentage_yield");
                } else {
                    this.props.handleDataSort(3, "portfolios", false, "absolute_yield");
                }
                break;
            default:
                this.props.handleDataSort(0, "portfolios", false, "symbol");
        }
    }

    render() {

        const currentPortfolio = this.props.loggedInUser.portfolios[this.props.currentPortfolio];

        const portfolioTitle = <p className="portfolio-name"><i className="fa fa-money page-menu-sign" aria-hidden="true" onClick={() => this.props.makePopupVisible("BuySellAsset", true)}></i>{currentPortfolio.name}</p>;

        const portfolioDropdown = this.props.loggedInUser.portfolios.map(portfolio => <option value={this.idToIndexConverter(portfolio.id)} key={portfolio.id}>{portfolio.name}</option>);

        const portfolioTotals = (assets) => {
            if (assets.length > 0) {
            const portfolioBookValue = assets.map(asset => asset.bought_value).reduce((acc, value) => acc + value, 0);
            const portfolioCurrentValue = Number.parseFloat((assets.map(asset => asset.current_quantity * this.props.coinFinder(asset.coin_id).price_eur).reduce((acc, value) => acc + value, 0)).toFixed(2));
            const portfolioTotalValue = Number.parseFloat((assets.map(asset => asset.current_quantity * this.props.coinFinder(asset.coin_id).price_eur + asset.sold_value).reduce((acc, value) => acc + value, 0)).toFixed(2));
            const portfolioYield = portfolioBookValue === 0 ? 0 : Number.parseFloat(((portfolioTotalValue / portfolioBookValue - 1) * 100).toFixed(2))
            return <div className="portfolio-totals">
                        <p className="portfolio-total-value">{this.props.amountConverter(portfolioCurrentValue)}</p>
                        <p className={`portfolio-total-yield ${this.props.priceColorSetter(portfolioYield)}`}>{`${portfolioYield.toLocaleString('en-GB')} %`}</p>
                    </div>;
            } else {
                return "";
            }
        }

        const portfolioAssets = (assets) => {

            if (assets.length > 0) {
                const portfolioAssets = [...assets]
                .sort(this.props.compareFunction(this.props.dataSort.portfolios.sortProperty, this.props.dataSort.portfolios.isUp))
                .map(asset => {

                    return <div className="asset-container" key={asset.coin_id}>
                        <div className="asset-item asset-name">
                            <div className="asset-icon"><img src={this.props.coinFinder(asset.coin_id).logo} alt={`${this.props.coinFinder(asset.coin_id).symbol} icon`} /></div>
                            <p>{this.props.coinFinder(asset.coin_id).symbol}</p>
                        </div>
                        <div className="asset-item asset-property">
                            <p>{this.props.amountConverter(asset.current_value)}</p>
                            <p>{asset.current_quantity.toLocaleString('en-GB', { maximumFractionDigits: this.props.coinFinder(asset.coin_id).quantity_scale })}</p>
                        </div>
                        <div className="asset-item asset-property">
                            <p className={`${this.props.priceColorSetter(asset.absolute_yield)}`}>{this.props.amountConverter(asset.absolute_yield)}</p>
                            <p className={`${this.props.priceColorSetter(asset.percentage_yield)}`}>{`${asset.percentage_yield.toFixed(2)} %`}</p>
                        </div>
                        <div className="asset-item asset-settings" onClick={() => this.handleAssetDetailsButtonClick(asset.coin_id)}>
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </div>
                    </div>
                });

                return <div className="portfolio-table">
                            <div className="portfolio-header">
                                <p className="sortable-column" onClick={() => this.handleSortColumn(0)}>{`${this.props.dataSort.portfolios.arrows[0]} Coin`}</p>
                                <p className="sortable-column" onClick={() => this.handleSortColumn(1)}>{`${this.props.dataSort.portfolios.arrows[1]} Value/Position ${this.props.dataSort.portfolios.arrows[2]}`}</p>
                                <p className="sortable-column" onClick={() => this.handleSortColumn(2)}>{`${this.props.dataSort.portfolios.arrows[3]} Yield €/% ${this.props.dataSort.portfolios.arrows[4]}`}</p>
                            </div>
                            <div className="portfolio-assets">
                                {portfolioAssets}
                            </div>
                        </div>;
            } else {
                return "";
            }
        }

        return (
            <div className="page-menu-container">
                <div className="page-menu-settings-container">
                        <p className="page-menu-sign"><i className="fa fa-plus-square" aria-hidden="true" onClick={() => this.props.makePopupVisible("AddPortfolio", true)}></i></p>
                        <p className="page-menu-sign"><i className="fa fa-pencil" aria-hidden="true" onClick={() => this.props.makePopupVisible("EditPortfolio", true)}></i></p>
                        <select name="portfolio-dropdown" className="page-menu-dropdown" value={this.state.portfolioDropdownValue} onChange={this.handlePortfolioDropdownChange}>{portfolioDropdown}</select>
                        <p className="page-menu-sign"><i className="fa fa-cog" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesSettings", true)}></i></p>
                        <p className="page-menu-sign page-menu-question-sign"><i className="fa fa-question-circle" aria-hidden="true" onClick={() => this.props.makePopupVisible("PortfoliosGuide", true)}></i></p>
                </div>
                {portfolioTitle}
                {portfolioTotals(this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets)}
                {portfolioAssets(this.props.loggedInUser.portfolios[this.props.currentPortfolio].assets)}
            </div>
        )
    }
}