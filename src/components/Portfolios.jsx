import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Portfolios.css';
import genericIcon from './img/generic.svg';
import React, { Component } from 'react';

export default class Portfolios extends Component {

    render() {

        const portfolioTotals = (assets) => {
            const portfolioBookValue = assets.map(asset => asset.quantity * asset.buyprice).reduce((acc, value) => acc + value, 0);
            const portfolioCurrentValue = Number.parseFloat((assets.map(asset => asset.quantity * asset.currentprice).reduce((acc, value) => acc + value, 0)).toFixed(2));
            const portfolioYield = Number.parseFloat(((portfolioCurrentValue / portfolioBookValue - 1) * 100).toFixed(2))
            return <div className="portfolio-totals">
                <p className="portfolio-total-value">{`€ ${portfolioCurrentValue.toLocaleString('en-GB')}`}</p>
                <p className="portfolio-total-yield">{`${portfolioYield.toLocaleString('en-GB')} %`}</p>
            </div>
        }

        const portfolioAssets = (assets) => {

            const portfolioAssets = assets.map((asset, i) => {

                const currentValue = Number.parseFloat((asset.quantity * asset.currentprice).toFixed(2));
                const absoluteYield = Number.parseFloat(((asset.currentprice - asset.buyprice) * asset.quantity).toFixed(2));
                const percentageYield = Number.parseFloat(((asset.currentprice / asset.buyprice - 1) * 100).toFixed(2));

                return <div className="asset-container" key={i}>
                    <div className="asset-item asset-name">
                        <div className="asset-icon"><img src={genericIcon} alt="icon"/></div>
                        <p>{asset.ticker}</p>
                    </div>
                    <div className="asset-item asset-property">
                        <p>{`€ ${currentValue.toLocaleString('en-GB')}`}</p>
                        <p>{asset.quantity}</p>
                    </div>
                    <div className="asset-item asset-property">
                        <p>{`€ ${absoluteYield.toLocaleString('en-GB')}`}</p>
                        <p>{`${percentageYield.toLocaleString('en-GB')} %`}</p>
                    </div>
                    <div className="asset-item asset-settings">
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>
                </div>
            });

            return <div className="portfolio-table">
                <div className="portfolio-header">
                    <p>Coin</p>
                    <p>Value/Position</p>
                    <p>Yield €/%</p>
                </div>
                <div className="portfolio-assets">
                    {portfolioAssets}
                </div>
            </div>
        }

        return (
            <div className="portfolio-container">
                <div className="portfolio-settings-container">
                    <div className="portfolio-management">
                        <p className="select-portfolio-sign"><i className="fa fa-folder-open-o" aria-hidden="true"></i></p>
                        <p className="add-portfolio-sign"><i className="fa fa-plus-square" aria-hidden="true"></i></p>
                        <p className="rename-portfolio-sign"><i className="fa fa fa-pencil" aria-hidden="true"></i></p>
                        <p className="close-portfolio-sign"><i className="fa fa-unlock" aria-hidden="true"></i></p>
                        <p className="delete-portfolio-sign"><i className="fa fa-trash" aria-hidden="true"></i></p>
                        <p className="add-asset-sign"><i className="fa fa-money" aria-hidden="true"></i></p>
                    </div>
                    <div className="portfolio-settings">
                        <p className="portfolio-setting-sign"><i className="fa fa-cog" aria-hidden="true" onClick={() => this.props.makePopupVisible("PortfoliosSettings", true)}></i></p>
                        <p className="portfolio-question-sign"><i className="fa fa-question-circle" aria-hidden="true" onClick={() => this.props.makePopupVisible("PortfoliosGuide", true)}></i></p>
                    </div>
                </div>
                <p className="portfolio-name">{this.props.portfolios[0].name}</p>
                {portfolioTotals(this.props.portfolios[0].assets)}
                {portfolioAssets(this.props.portfolios[0].assets)}
            </div>
        )
    }
}