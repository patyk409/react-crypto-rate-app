import React from 'react'
import '../styles/CryptoList.css'

const CryptoList = (props) => {
  let cryptoList = props.cryptoList

  let listElements = cryptoList.map((cryptoObj) => {
    return (
      <li key={cryptoObj.currency}>
        <span className="CryptoLabel">Last Rate:</span>
        <span className={`CryptoRate ${cryptoObj.cssClass}`}>
          {cryptoObj.lastRate} {cryptoObj.htmlArray}
        </span>
        <span className="CryptoTicker">{cryptoObj.currency}</span>
        <span className="CryptoSymbol">[{cryptoObj.symbol}]</span>
      </li>
    )
  })

  return (
    <div className="CryptoList">
      <ul className="List">{listElements}</ul>
    </div>
  )
}

export default CryptoList
