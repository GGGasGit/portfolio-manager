import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './Prices.css';
import React, { Component } from 'react';

export default class Prices extends Component {

    state = {
        icons: {},
    }

    componentDidMount() {
        let newIcons = {};
        for (let symbol of this.props.symbols) {
            import(`${symbol.icon}`).then(icon => {
                newIcons[`${symbol.ticker}`] = icon.default
                this.setState({
                    icons: newIcons
                })
            }
            )
        }
    }

    render() {

        const symbols = [...this.props.symbols]
            .map((symbol, i) => <div className="price-item" key={i}>
                <div className="ticker">
                    <div className="ticker-image"><img src={this.state.icons[`${symbol.ticker}`]} alt={`${symbol.ticker} icon`} /></div>
                    <div>
                        <p className="ticker-symbol">{`${symbol.ticker}`}</p>
                        <p className="ticker-name">{`${symbol.name}`}</p>
                    </div>
                </div>
                <div className="ticker-price">{`€ ${symbol.price.toLocaleString('en-GB')}`}</div>
            </div>
            );

        return (
            <div className="price-container">
                <div className="price-settings">
                    <div className="watchlist-management">
                        <p className="add-symbol-sign"><i className="fa fa-plus-square" aria-hidden="true"></i></p>
                    </div>
                    <div className="watchlist-settings">
                        <p className="price-setting-sign"><i className="fa fa-cog" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesSettings", true)}></i></p>
                        <p className="price-question-sign"><i className="fa fa-question-circle" aria-hidden="true" onClick={() => this.props.makePopupVisible("PricesGuide", true)}></i></p>
                    </div>
                </div>
                {symbols}
            </div>
        )
    }
}