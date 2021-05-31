import './App.css';
import React, { Component } from 'react';
import Prices from './components/Prices';
import Portfolios from './components/Portfolios';
import PricesGuide from './components/PricesGuide';
import PortfoliosGuide from './components/PortfoliosGuide';
import PricesSettings from './components/PricesSettings';
import Login from './components/Login';
import AddWatchlist from './components/AddWatchlist';
import EditWatchlist from './components/EditWatchlist';
import AddPortfolio from './components/AddPortfolio';
import EditPortfolio from './components/EditPortfolio';
import BuySellAsset from './components/BuySellAsset';
import EditAsset from './components/EditAsset';
import EditTransaction from './components/EditTransaction';

export default class App extends Component {

  state = {
    page: "Login",
    loggedInUser: "",
    loginMessage: "",
    errorMessage: "",
    coins: [],
    currentIndexes: {
      watchlist: 0,
      portfolio: 0,
      asset: 0,
      transaction: 0
    },
    popups: {
      PricesGuide: false, PortfoliosGuide: false, PricesSettings: false,
      AddWatchlist: false, EditWatchlist: false, AddPortfolio: false,
      EditPortfolio: false, EditAsset: false, BuySellAsset: false, EditTransaction: false
    },
    dataSort: {
      prices: { index: 0, isUp: true, arrows: ["▲", "", ""], sortProperty: "symbol" },
      portfolios: { index: 0, isUp: true, arrows: ["▲", "", "", "", ""], sortProperty: "symbol" }
    }
  }

  async componentDidMount() {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/coins", fetchOptions);
      const result = await response.json();
      this.setState({
        coins: result.coins
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  /*async componentDidUpdate() {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/coins", fetchOptions);
      const result = await response.json();
      this.setState({
        coins: result.coins
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }*/

  handlePageChange = (newpage) => {
    this.setState({
      page: newpage
    });
  }

  clearErrorMessage = () => {
    this.setState({
      errorMessage: ""
    });
  }

  makePopupVisible = (popupName, direction) => {
    const newPopups = JSON.parse(JSON.stringify(this.state.popups));
    newPopups[`${popupName}`] = direction;
    this.setState({
      popups: newPopups,
    });
  }

  handleCurrencyChange = (currency) => {
    let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
    newUserData["base_currency"] = currency;
    this.setState({
      loggedInUser: newUserData,
    });
  }

  priceConverter = (coin) => {
    return this.state.loggedInUser.base_currency === "EUR"
      ? `€ ${coin.price_eur.toLocaleString('en-GB', { maximumFractionDigits: coin.price_scale })}`
      : `$ ${coin.price_usd.toLocaleString('en-GB', { maximumFractionDigits: coin.price_scale })}`
  }

  valueConverter = (value, coin) => {
    const usdEurRate = this.state.coins.filter(coin => coin.coinId === 12)[0].price_eur;
    return this.state.loggedInUser.base_currency === "EUR"
      ? `€ ${value.toLocaleString('en-GB', { maximumFractionDigits: coin.price_scale })}`
      : `$ ${(value / usdEurRate).toLocaleString('en-GB', { maximumFractionDigits: coin.price_scale })}`
  }

  amountConverter = (amount) => {
    const usdEurRate = this.state.coins.filter(coin => coin.coinId === 12)[0].price_eur;
    return this.state.loggedInUser.base_currency === "EUR"
      ? `€ ${amount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}`
      : `$ ${(amount / usdEurRate).toLocaleString('en-GB', { maximumFractionDigits: 2 })}`
  }

  priceColorSetter = (priceChange) => {
    return priceChange >= 0 ? "green" : "red";
  }

  coinFinder = (coinId) => {
    return this.state.coins.filter(coin => coin.coinId === coinId)[0]
  }

  coinListCreator = () => {
    return [...this.state.loggedInUser.watchlists[this.state.currentIndexes.watchlist].coins]
      .map(coin => {
        return {
          coinId: this.coinFinder(coin.coin_id).coinId,
          symbol: this.coinFinder(coin.coin_id).symbol,
          coinName: this.coinFinder(coin.coin_id).coinName,
          logo: this.coinFinder(coin.coin_id).logo,
          price_eur: this.coinFinder(coin.coin_id).price_eur,
          price_usd: this.coinFinder(coin.coin_id).price_usd,
          price_change: this.coinFinder(coin.coin_id).price_change,
          price_scale: this.coinFinder(coin.coin_id).price_scale,
          quantity_scale: this.coinFinder(coin.coin_id).quantity_scale,
        }
      })
  }

  handleUserLogin = async (username) => {
    const data = { name: username };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/login", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        this.setState({
          loginMessage: `Welcome, ${result.users[0].name}`,
          errorMessage: "",
          loggedInUser: result.users[0],
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  handleUserRegister = async (username) => {
    const data = { name: username }; 
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/register", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        this.setState({
          loginMessage: `Sucessfully registered, ${username}`,
          loggedInUser: result.users[0],
          errorMessage: "",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  handleUserLogout = async () => {
    this.setState({
      loginMessage: ""
    });
    const data = { id: this.state.loggedInUser.id, currency: this.state.loggedInUser.base_currency };
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/logout", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          page: "Login",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  apyCalculator = (transactions, absoluteYield) => {
    if (transactions.length === 0) {
      return 0;
    }

    const sortedBuyTransactions = [...transactions]
      .filter(transaction => transaction.buy_sell === 0)
      .sort(this.compareFunction("date", true))

    const currentDate = new Date(new Date().toJSON().slice(0, 10));
    const firstBuyDate = new Date(sortedBuyTransactions[0].date);
    let averageYield = 0;

    if (sortedBuyTransactions.length === 1) {
      averageYield = absoluteYield / (sortedBuyTransactions[0].quantity * sortedBuyTransactions[0].price);
    } else {

      const daysOfInvestment = [[(new Date(sortedBuyTransactions[1].date) - firstBuyDate) / 86400000, sortedBuyTransactions[0].quantity * sortedBuyTransactions[0].price]];
      for (let i = 1; i < sortedBuyTransactions.length - 1; i++) {
        const date1 = new Date(sortedBuyTransactions[i].date);
        const date2 = new Date(sortedBuyTransactions[i + 1].date);
        const numOfDays = (date2 - date1) / 86400000;
        daysOfInvestment.push([numOfDays, daysOfInvestment[i - 1][1] + sortedBuyTransactions[i].quantity * sortedBuyTransactions[i].price]);
      }
      daysOfInvestment.push([(currentDate - new Date(sortedBuyTransactions[sortedBuyTransactions.length - 1].date)) / 86400000, daysOfInvestment[sortedBuyTransactions.length - 2][1] + sortedBuyTransactions[sortedBuyTransactions.length - 1].quantity * sortedBuyTransactions[sortedBuyTransactions.length - 1].price]);

      let investmentDays = 0;
      let days = 0;
      for (let elem of daysOfInvestment) {
        days += elem[0];
        investmentDays += elem[0] * elem[1];
      }
      const averageInvestment = investmentDays / days;
      averageYield = absoluteYield / averageInvestment;
    }

    const currentYear = currentDate.getFullYear();
    const numberOfDays = (currentDate - firstBuyDate) / 86400000;
    const numberOfYears = currentYear - firstBuyDate.getFullYear();
    const numberOfDaysInLastYear = (currentDate - new Date(firstBuyDate.getFullYear() + numberOfYears, firstBuyDate.getMonth(), firstBuyDate.getDate())) / 86400000;
    //To see whether it is a leap year or not
    if ((currentYear % 400 === 0) || ((currentYear % 4 === 0) && (currentYear % 100 !== 0))) {
      if (numberOfDays <= 366) {
        return averageYield * 366 / numberOfDays;
      } else {
        return 100 * ((1 + averageYield / 100) ** (1 / (numberOfYears + numberOfDaysInLastYear / 366)) - 1)
      }
      //If it is a normal year
    } else {
      if (numberOfDays <= 365) {
        return averageYield * 365 / numberOfDays;
      } else {
        return 100 * ((1 + averageYield / 100) ** (1 / (numberOfYears + numberOfDaysInLastYear / 365)) - 1)
      }
    }
  }

  //Summarises transactions by coin_id and returns the assets property of the user's portfolio
  createAssetsFromTransactions = (transactions) => {
    const assets = []
    for (let transaction of transactions) {
      if (assets.filter(asset => asset.coin_id === transaction.coin_id).length === 0) {
        assets.push({ coin_id: transaction.coin_id });
      }
    }
    for (let i = 0; i < assets.length; i++) {
      const filteredAssets = transactions.filter(transaction => transaction.coin_id === assets[i].coin_id);
      const assetTotalBuyQuantity = filteredAssets.filter(transaction => transaction.buy_sell === 0).map(transaction => transaction.quantity).reduce((acc, value) => acc + value * 100000000, 0) / 100000000;
      const assetTotalSellQuantity = filteredAssets.filter(transaction => transaction.buy_sell === 1).map(transaction => transaction.quantity).reduce((acc, value) => acc + value * 100000000, 0) / 100000000;
      const assetTotalBuyValue = filteredAssets.filter(transaction => transaction.buy_sell === 0).map(transaction => transaction.quantity * transaction.price).reduce((acc, value) => acc + value, 0);
      const assetTotalSellValue = filteredAssets.filter(transaction => transaction.buy_sell === 1).map(transaction => transaction.quantity * transaction.price).reduce((acc, value) => acc + value, 0);
      assets[i].total_buy_quantity = assetTotalBuyQuantity;
      assets[i].total_sell_quantity = assetTotalSellQuantity;
      assets[i].current_quantity = (assetTotalBuyQuantity * 100000000 - assetTotalSellQuantity * 100000000) / 100000000;
      assets[i].average_buy_price = (assetTotalBuyValue / assetTotalBuyQuantity).toPrecision(8);
      assets[i].bought_value = assetTotalBuyValue;
      assets[i].sold_value = assetTotalSellValue;
      assets[i].current_value = assets[i].current_quantity * this.coinFinder(assets[i].coin_id).price_eur;
      assets[i].absolute_yield = assets[i].current_value + assets[i].sold_value - assets[i].bought_value;
      assets[i].percentage_yield = (assets[i].absolute_yield / assets[i].bought_value) * 100;
      assets[i].symbol = this.coinFinder(assets[i].coin_id).symbol;
      assets[i].apy = assets[i].absolute_yield === 0 ? 0 : this.apyCalculator(filteredAssets, assets[i].absolute_yield) * 100;
    }
    return assets;
  }

  finaliseUserPortfolioData = (portfolios) => {
    let tempPortfolio = [...portfolios];
    for (let i = 0; i < tempPortfolio.length; i++) {
      tempPortfolio[i].assets = this.createAssetsFromTransactions(tempPortfolio[i].transactions);
    }
    return tempPortfolio;
  }

  getUserData = async () => {
    let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
    const data = { id: this.state.loggedInUser.id };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const watchlistsResponse = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists", fetchOptions);
      const watchlistsResult = await watchlistsResponse.json();
      newUserData["watchlists"] = watchlistsResult.watchlists;
      const portfoliosResponse = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios", fetchOptions);
      const portfoliosResult = await portfoliosResponse.json();
      const tempPortfolios = portfoliosResult.portfolios;
      newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
      this.setState({
        loggedInUser: newUserData,
        page: "Prices",
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  handleCreateNewWatchlist = async (watchlist) => {
    const data = { id: this.state.loggedInUser.id, watchlistName: watchlist };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists/add", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        newUserData["watchlists"] = result.watchlists;
        let newCurrentIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
        newCurrentIndexes["watchlist"] = newUserData["watchlists"].length - 1;
        this.setState({
          currentIndexes: newCurrentIndexes,
          loggedInUser: newUserData,
          errorMessage: "",
        });
        this.makePopupVisible("AddWatchlist", false);
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  handleCreateNewPortfolio = async (portfolio) => {
    const data = { id: this.state.loggedInUser.id, portfolioName: portfolio };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/add", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        const tempPortfolios = result.portfolios;
        newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
        let newCurrentIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
        newCurrentIndexes["portfolio"] = newUserData["portfolios"].length - 1;
        this.setState({
          currentIndexes: newCurrentIndexes,
          loggedInUser: newUserData,
          errorMessage: "",
        });
        this.makePopupVisible("AddPortfolio", false);
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  setCurrentIndex = (index, property) => {
    const newIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
    newIndexes[property] = index;
    this.setState({
      currentIndexes: newIndexes
    });
  }

  deleteWatchlistItem = async (id) => {
    const currentWatchlist = this.state.loggedInUser.watchlists[this.state.currentIndexes.watchlist];
    const confirmed = window.confirm("Do you really want to delete this item?")
    if (confirmed) {
      const data = { watchlistId: currentWatchlist.id, coinId: id, userId: this.state.loggedInUser.id };
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists/coins/delete", fetchOptions);
        const result = await response.json();
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        newUserData["watchlists"] = result.watchlists;
        this.setState({
          loggedInUser: newUserData,
          errorMessage: "",
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        });
      }
    }
  }

  addWatchlistItem = async (id) => {
    const currentWatchlist = this.state.loggedInUser.watchlists[this.state.currentIndexes.watchlist];
    const data = { watchlistId: currentWatchlist.id, coinId: id, userId: this.state.loggedInUser.id };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists/coins/add", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        newUserData["watchlists"] = result.watchlists;
        this.setState({
          loggedInUser: newUserData,
          errorMessage: "",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  addTransactionToPortfolio = async (coinId, buy_sell, quantity, price, date) => {
    const currentPortfolio = this.state.loggedInUser.portfolios[this.state.currentIndexes.portfolio];
    const data = { userId: this.state.loggedInUser.id, portfolioId: currentPortfolio.id, coinId: coinId, buy_sell: buy_sell, quantity: quantity, price: price, date: date };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/transactions/add", fetchOptions);
      const result = await response.json();
      let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
      const tempPortfolios = result.portfolios;
      newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
      this.setState({
        loggedInUser: newUserData,
        errorMessage: "",
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  renamePortfolio = async (name) => {
    const currentPortfolio = this.state.loggedInUser.portfolios[this.state.currentIndexes.portfolio];
    const data = { userId: this.state.loggedInUser.id, portfolioId: currentPortfolio.id, portfolioName: name };
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/rename", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        const tempPortfolios = result.portfolios;
        newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
        this.setState({
          loggedInUser: newUserData,
          errorMessage: "",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  renameWatchlist = async (name) => {
    const currentWatchlist = this.state.loggedInUser.watchlists[this.state.currentIndexes.watchlist];
    const data = { userId: this.state.loggedInUser.id, watchlistId: currentWatchlist.id, watchlistName: name };
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists/rename", fetchOptions);
      const result = await response.json();
      if (result.message) {
        this.setState({
          errorMessage: result.message,
        });
      } else {
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        newUserData["watchlists"] = result.watchlists;
        this.setState({
          loggedInUser: newUserData,
          errorMessage: "",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  deleteWatchlist = async () => {
    if (this.state.loggedInUser.watchlists.length > 1) {
      const currentWatchlist = this.state.loggedInUser.watchlists[this.state.currentIndexes.watchlist];
      const data = { userId: this.state.loggedInUser.id, watchlistId: currentWatchlist.id };
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch("https://phu7m.sse.codesandbox.io/api/watchlists/delete", fetchOptions);
        const result = await response.json();
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        newUserData["watchlists"] = result.watchlists;
        let newCurrentIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
        newCurrentIndexes["watchlist"] = 0;
        this.setState({
          currentIndexes: newCurrentIndexes,
          loggedInUser: newUserData,
          errorMessage: "",
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        });
      }
    } else {
      alert("You cannot delete this watchlist. There must be at least one watchlist.");
    }
  }

  deletePortfolio = async () => {
    if (this.state.loggedInUser.portfolios.length > 1) {
      const currentPortfolio = this.state.loggedInUser.portfolios[this.state.currentIndexes.portfolio];
      const data = { userId: this.state.loggedInUser.id, portfolioId: currentPortfolio.id };
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/delete", fetchOptions);
        const result = await response.json();
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        const tempPortfolios = result.portfolios;
        newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
        let newCurrentIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
        newCurrentIndexes["portfolio"] = 0;
        this.setState({
          currentIndexes: newCurrentIndexes,
          loggedInUser: newUserData,
          errorMessage: "",
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        });
      }
    } else {
      alert("You cannot delete this portfolio. There must be at least one portfolio.");
    }
  }

  deleteAsset = async (id) => {
    const currentPortfolio = this.state.loggedInUser.portfolios[this.state.currentIndexes.portfolio];
    const confirmed = window.confirm("Do you really want to delete this asset and all related transactions from this portfolio?")
    if (confirmed) {
      const data = { userId: this.state.loggedInUser.id, portfolioId: currentPortfolio.id, coinId: id };
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/assets/delete", fetchOptions);
        const result = await response.json();
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        const tempPortfolios = result.portfolios;
        newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
        let newCurrentIndexes = JSON.parse(JSON.stringify(this.state.currentIndexes));
        newCurrentIndexes["asset"] = 0;
        this.setState({
          currentIndexes: newCurrentIndexes,
          loggedInUser: newUserData,
          errorMessage: "",
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        });
      }
    }
  }

  deleteTransaction = async (id) => {
    const confirmed = window.confirm("Do you really want to delete this transaction?")
    if (confirmed) {
      const data = { userId: this.state.loggedInUser.id, transactionId: id };
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/transactions/delete", fetchOptions);
        const result = await response.json();
        let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
        const tempPortfolios = result.portfolios;
        newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
        this.setState({
          loggedInUser: newUserData,
          errorMessage: "",
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        });
      }
    }
  }

  editTransaction = async (quantity, price, date) => {
    const currentTransaction = this.state.loggedInUser.portfolios[this.state.currentIndexes.portfolio].transactions[this.state.currentIndexes.transaction];
    const data = { userId: this.state.loggedInUser.id, transactionId: currentTransaction.id, quantity: quantity, price: price, date: date };
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("https://phu7m.sse.codesandbox.io/api/portfolios/transactions/edit", fetchOptions);
      const result = await response.json();
      let newUserData = JSON.parse(JSON.stringify(this.state.loggedInUser));
      const tempPortfolios = result.portfolios;
      newUserData["portfolios"] = this.finaliseUserPortfolioData(tempPortfolios);
      this.setState({
        loggedInUser: newUserData,
        errorMessage: "",
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  compareFunction = (sortProperty, order) => {
    return function innerSort(a, b) {
      let comparison = 0;
      if (a[sortProperty] > b[sortProperty]) {
        comparison = 1;
      } else if (a[sortProperty] < b[sortProperty]) {
        comparison = -1;
      }
      return (
        (order) ? (comparison) : (comparison * -1)
      );
    };
  }

  handleDataSort = (index, page, isUp, sortProperty) => {
    let newDataSort = JSON.parse(JSON.stringify(this.state.dataSort));
    newDataSort[page].index = index;
    newDataSort[page].arrows = newDataSort[page].arrows.map(() => "");
    newDataSort[page].arrows[index] = (isUp) ? "▼" : "▲";
    newDataSort[page].isUp = !isUp;
    newDataSort[page].sortProperty = sortProperty;
    this.setState({
      dataSort: newDataSort,
    });
  }

  transactionQuantityChecker = (transactions) => {
    const checkedTransactions = [...transactions].sort(this.compareFunction("date", true));
    let totalQuantityUntilDate = 0;
    for (let transaction of checkedTransactions) {
      totalQuantityUntilDate = transaction.buy_sell === 0 ? (totalQuantityUntilDate * 100000000 + transaction.quantity * 100000000) / 100000000 : (totalQuantityUntilDate * 100000000 - transaction.quantity * 100000000) / 100000000;
      if (totalQuantityUntilDate < 0) {
        return 1;
      }
    }
    return 0;
  }

  inputDecimalSetter = (value, scale) => {
    if (scale === 0) {
      if (value.indexOf(".") >= 0) {
        return value.substr(0, value.indexOf("."));
      } else if (value.indexOf(",") >= 0) {
        return value.substr(0, value.indexOf(","));
      } else {
        return value;
      }
    }
    if (value.indexOf(".") >= 0) {
      return value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), scale + 1);
    } else if (value.indexOf(",") >= 0) {
      return value.substr(0, value.indexOf(",")) + value.substr(value.indexOf(","), scale + 1);
    } else {
      return value;
    }
  }

  /*checkUserData = () => {
    console.log(this.state.loggedInUser);
  }*/

  render() {
    let Page = "";
    let pricesClass = "menu-item active-menu-item";
    let portfoliosClass = "menu-item";

    if (this.state.page === "Login") {
      Page = <Login
        loginMessage={this.state.loginMessage}
        errorMessage={this.state.errorMessage}
        handleUserLogin={this.handleUserLogin}
        handleUserRegister={this.handleUserRegister}
        getUserData={this.getUserData}
      />;
    }
    if (this.state.page === "Prices") {
      Page = <Prices makePopupVisible={this.makePopupVisible}
        //checkUserData={this.checkUserData}
        loggedInUser={this.state.loggedInUser}
        currentWatchlist={this.state.currentIndexes.watchlist}
        setCurrentIndex={this.setCurrentIndex}
        coinListCreator={this.coinListCreator}
        priceConverter={this.priceConverter}
        priceColorSetter={this.priceColorSetter}
        dataSort={this.state.dataSort}
        handleDataSort={this.handleDataSort}
        compareFunction={this.compareFunction}
      />;
      pricesClass = "menu-item active-menu-item";
      portfoliosClass = "menu-item";
    }
    if (this.state.page === "Portfolios") {
      Page = <Portfolios makePopupVisible={this.makePopupVisible}
        loggedInUser={this.state.loggedInUser}
        currentPortfolio={this.state.currentIndexes.portfolio}
        setCurrentIndex={this.setCurrentIndex}
        coinFinder={this.coinFinder}
        amountConverter={this.amountConverter}
        priceColorSetter={this.priceColorSetter}
        dataSort={this.state.dataSort}
        handleDataSort={this.handleDataSort}
        compareFunction={this.compareFunction}
      />;
      pricesClass = "menu-item";
      portfoliosClass = "menu-item active-menu-item";
    }

    let pricesGuidePopup = "";
    if (this.state.popups.PricesGuide) {
      pricesGuidePopup = <PricesGuide makePopupVisible={this.makePopupVisible}
        loggedInUser={this.state.loggedInUser} />
    }

    let portfoliosGuidePopup = "";
    if (this.state.popups.PortfoliosGuide) {
      portfoliosGuidePopup = <PortfoliosGuide makePopupVisible={this.makePopupVisible} />
    }

    let pricesSettingsPopup = "";
    if (this.state.popups.PricesSettings) {
      pricesSettingsPopup = <PricesSettings makePopupVisible={this.makePopupVisible}
        handleCurrencyChange={this.handleCurrencyChange}
        loggedInUser={this.state.loggedInUser} />
    }

    let addWatchlistPopup = "";
    if (this.state.popups.AddWatchlist) {
      addWatchlistPopup = <AddWatchlist makePopupVisible={this.makePopupVisible}
        handleCreateNewWatchlist={this.handleCreateNewWatchlist}
        errorMessage={this.state.errorMessage}
        clearErrorMessage={this.clearErrorMessage}
      />
    }

    let addPortfolioPopup = "";
    if (this.state.popups.AddPortfolio) {
      addPortfolioPopup = <AddPortfolio makePopupVisible={this.makePopupVisible}
        handleCreateNewPortfolio={this.handleCreateNewPortfolio}
        errorMessage={this.state.errorMessage}
        clearErrorMessage={this.clearErrorMessage}
      />
    }

    let editWatchlistPopup = "";
    if (this.state.popups.EditWatchlist) {
      editWatchlistPopup = <EditWatchlist makePopupVisible={this.makePopupVisible}
        errorMessage={this.state.errorMessage}
        clearErrorMessage={this.clearErrorMessage}
        loggedInUser={this.state.loggedInUser}
        currentWatchlist={this.state.currentIndexes.watchlist}
        coins={this.state.coins}
        coinListCreator={this.coinListCreator}
        deleteWatchlistItem={this.deleteWatchlistItem}
        addWatchlistItem={this.addWatchlistItem}
        renameWatchlist={this.renameWatchlist}
        deleteWatchlist={this.deleteWatchlist}
        compareFunction={this.compareFunction}
      />
    }

    let editPortfolioPopup = "";
    if (this.state.popups.EditPortfolio) {
      editPortfolioPopup = <EditPortfolio makePopupVisible={this.makePopupVisible}
        errorMessage={this.state.errorMessage}
        clearErrorMessage={this.clearErrorMessage}
        loggedInUser={this.state.loggedInUser}
        currentPortfolio={this.state.currentIndexes.portfolio}
        renamePortfolio={this.renamePortfolio}
        deletePortfolio={this.deletePortfolio}
      />
    }

    let editAssetPopup = "";
    if (this.state.popups.EditAsset) {
      editAssetPopup = <EditAsset makePopupVisible={this.makePopupVisible}
        errorMessage={this.state.errorMessage}
        loggedInUser={this.state.loggedInUser}
        currentPortfolio={this.state.currentIndexes.portfolio}
        currentAsset={this.state.currentIndexes.asset}
        coinFinder={this.coinFinder}
        addTransactionToPortfolio={this.addTransactionToPortfolio}
        deleteAsset={this.deleteAsset}
        deleteTransaction={this.deleteTransaction}
        setCurrentIndex={this.setCurrentIndex}
        priceConverter={this.priceConverter}
        valueConverter={this.valueConverter}
        amountConverter={this.amountConverter}
        priceColorSetter={this.priceColorSetter}
        compareFunction={this.compareFunction}
        transactionQuantityChecker={this.transactionQuantityChecker}
        inputDecimalSetter={this.inputDecimalSetter}
      />
    }

    let buySellAssetPopup = "";
    if (this.state.popups.BuySellAsset) {
      buySellAssetPopup = <BuySellAsset makePopupVisible={this.makePopupVisible}
        errorMessage={this.state.errorMessage}
        loggedInUser={this.state.loggedInUser}
        currentPortfolio={this.state.currentIndexes.portfolio}
        coinFinder={this.coinFinder}
        coins={this.state.coins}
        addTransactionToPortfolio={this.addTransactionToPortfolio}
        compareFunction={this.compareFunction}
        transactionQuantityChecker={this.transactionQuantityChecker}
        inputDecimalSetter={this.inputDecimalSetter}
      />
    }

    let editTransactionPopup = "";
    if (this.state.popups.EditTransaction) {
      editTransactionPopup = <EditTransaction makePopupVisible={this.makePopupVisible}
        errorMessage={this.state.errorMessage}
        loggedInUser={this.state.loggedInUser}
        currentPortfolio={this.state.currentIndexes.portfolio}
        currentAsset={this.state.currentIndexes.asset}
        currentTransaction={this.state.currentIndexes.transaction}
        coinFinder={this.coinFinder}
        editTransaction={this.editTransaction}
        transactionQuantityChecker={this.transactionQuantityChecker}
        inputDecimalSetter={this.inputDecimalSetter}
      />
    }

    let scrollable = "scrollable";
    for (let popup in this.state.popups) {
      if (this.state.popups[popup]) {
        scrollable = "unscrollable";
        break
      }
    }

    return (
      <div className={`main-container ${scrollable}`}>
        <header>
          <nav>
            <ul>
              <li className="logout-item" onClick={this.handleUserLogout}>Logout</li>
            </ul>
            <ul className="menu-container">
              <li className={pricesClass} onClick={() => this.handlePageChange("Prices")}>Prices</li>
              <li className={portfoliosClass} onClick={() => this.handlePageChange("Portfolios")}>Portfolios</li>
            </ul>
          </nav>
        </header>
        <main>
          {portfoliosGuidePopup}
          {pricesSettingsPopup}
          {pricesGuidePopup}
          {addWatchlistPopup}
          {editWatchlistPopup}
          {addPortfolioPopup}
          {editPortfolioPopup}
          {editAssetPopup}
          {buySellAssetPopup}
          {editTransactionPopup}
          {Page}
        </main>
      </div>
    )
  }
}