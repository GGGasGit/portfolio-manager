import './App.css';
import React, { Component } from 'react';
import Prices from './components/Prices';
import Portfolios from './components/Portfolios';
import PricesGuide from './components/PricesGuide'
import PortfoliosGuide from './components/PortfoliosGuide'
import PricesSettings from './components/PricesSettings';
import PortfoliosSettings from './components/PortfoliosSettings'

export default class App extends Component {

  //"https://api.binance.com/api/v3/ticker/price"
  //"https://api.binance.com/api/v3/exchangeInfo"

  state = {
    page: "Prices",
    popups: { PricesGuide: false, PortfoliosGuide: false, PricesSettings: false, PortfoliosSettings: false },
    currencySetting: "EUR",
    symbols: [
      { ticker: "USDT", quote: "eur", ticksize: 2, price: 0.84, name: "Tether USD", icon: "./img/usdt.svg" },
      { ticker: "BTC", quote: "eur", ticksize: 2, price: 49800, name: "Bitcoin", icon: "./img/btc.svg" },
      { ticker: "ETH", quote: "eur", ticksize: 2, price: 1780, name: "Ethereum", icon: "./img/eth.svg" },
    ],
    portfolios: [
      {
        name: "Alapportfólió", currency: "EUR", active: true, key: 0, id: 0,
        assets: [
          { ticker: "BTC", quantity: 0.89657423, buydate: "2020-10-11", buyprice: 43258.12, currentprice: 49871.36, key: 0, id: 0, active: true },
          { ticker: "ETH", quantity: 1200.34, buydate: "2020-08-21", buyprice: 317.86, currentprice: 1789.51, key: 1, id: 2, active: true },
        ]
      }
    ]
  }

  handlePageChange = (newpage) => {
    this.setState({
      page: newpage
    });
  }

  makePopupVisible = (popupName, direction) => {
    const newPopups = JSON.parse(JSON.stringify(this.state.popups));
    newPopups[`${popupName}`] = direction;
    this.setState({
      popups: newPopups,
    });
  }

  handlePricesCurrencyChange = (currency) => {
    this.setState({
      currencySetting: currency,
    });
  };

  render() {

    let Page = <Prices symbols={this.state.symbols} makePopupVisible={this.makePopupVisible} currencySetting={this.state.currencySetting}/>;
    let pricesClass = "menu-item active-menu-item";
    let portfoliosClass = "menu-item";
    if (this.state.page === "Portfolios") {
      Page = <Portfolios portfolios={this.state.portfolios} makePopupVisible={this.makePopupVisible} />;
      pricesClass = "menu-item";
      portfoliosClass = "menu-item active-menu-item";
    }

    let pricesGuidePopup = ""
    if (this.state.popups.PricesGuide) {
      pricesGuidePopup = <PricesGuide makePopupVisible={this.makePopupVisible} />
    }

    let portfoliosGuidePopup = ""
    if (this.state.popups.PortfoliosGuide) {
      portfoliosGuidePopup = <PortfoliosGuide makePopupVisible={this.makePopupVisible} />
    }

    let pricesSettingsPopup = ""
    if (this.state.popups.PricesSettings) {
      pricesSettingsPopup = <PricesSettings makePopupVisible={this.makePopupVisible} handlePricesCurrencyChange={this.handlePricesCurrencyChange}/>
    }

    let portfoliosSettingsPopup = ""
    if (this.state.popups.PortfoliosSettings) {
      portfoliosSettingsPopup = <PortfoliosSettings makePopupVisible={this.makePopupVisible} />
    }

    return (
      <>
        <header>
          <nav>
            <ul className="menu-container">
              <li className={pricesClass} onClick={() => this.handlePageChange("Prices")}>Prices</li>
              <li className={portfoliosClass} onClick={() => this.handlePageChange("Portfolios")}>Portfolios</li>
            </ul>
          </nav>
        </header>
        <main>
          {portfoliosSettingsPopup}
          {pricesSettingsPopup}
          {pricesGuidePopup}
          {portfoliosGuidePopup}
          {Page}
        </main>
      </>
    )
  }
}