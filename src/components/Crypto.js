import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Crypto.css';
import CryptoList from '../components/CryptoList';

class Crypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoList: [],
      filteredCryptoList: []
    };
  };

  componentDidMount() {
    this.getCryptoData();

    this.timerId = setInterval(() => {
      this.getCryptoData()
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  };

  getCryptoData = () => {
    axios.get('https://blockchain.info/ticker')
      .then(res => {
        const tickers = res.data;
        this.setState(state => {
          let newCryptoList = [];

          for (const [ticker, cryptoRate] of Object.entries(tickers)) {
            let lastCryptoObj = state.cryptoList.find(cryptoObj => {
              return (cryptoObj.currency === ticker);
            });

            let newCryptoObj = {
              currency: ticker,
              symbol: cryptoRate.symbol,
              buy: cryptoRate.buy,
              sell: cryptoRate.sell,
              lastRate: cryptoRate.last
            };

            if (lastCryptoObj !== undefined) {
              if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                newCryptoObj.cssClass = 'green';
                newCryptoObj.htmlArray = <i className="fas fa-arrow-up"></i>;
              } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                newCryptoObj.cssClass = 'red';
                newCryptoObj.htmlArray = <i className="fas fa-arrow-down"></i>;
              } else {
                newCryptoObj.cssClass = 'blue';
                newCryptoObj.htmlArray = <i className="fas fa-arrow-right"></i>;
              }
            } else {
              newCryptoObj.cssClass = 'blue';
              newCryptoObj.htmlArray = <i className="fas fa-arrow-right"></i>;
            }

            newCryptoList.push(newCryptoObj);
          };

          return ({
            cryptoList: newCryptoList
          });
        });

        this.filterCryptoList();
      });
  };

  filterCryptoList = () => {
    this.inputFilter.value = this.inputFilter.value.trim().toUpperCase();

    this.setState(state => {
      let newFilteredCryptoList = state.cryptoList.filter(cryptoObj => {
        return (cryptoObj.currency.includes(this.inputFilter.value));
      });

      return ({
        filteredCryptoList: newFilteredCryptoList
      });
    });
  };

  render() {
    return (
      <div className="Crypto">
        <input type="text" ref={data => this.inputFilter = data} placeholder="FILTER" onChange={this.filterCryptoList} />
        <CryptoList cryptoList={this.state.filteredCryptoList} />
      </div>
    );
  };
};

export default Crypto;
