import { useState, useEffect } from "react";
import "./App.css";


// API https://api2.binance.com/api/v3/ticker/24hr

const CRYPTO_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin'
}


export default function App() {

  const[coin, setCoin] = useState([])
  useEffect(() => {
    fetch('https://api2.binance.com/api/v3/ticker/24hr')
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter((crypto,i,data) => {
        if( Object.keys(CRYPTO_NAMES).includes(crypto.symbol)) {
          return true
        }
      }, false)
      setCoin(filteredData);
    })
  }, [])

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
            </thead>
          <tbody>
            {
             coin.map((coins, i) => {
              return (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{CRYPTO_NAMES[coins.symbol]}</td>
                  <td>${Number(coins.lastPrice).toLocaleString()}</td>
                  {Number(coins.priceChangePercent) > 0 
                    ?<td style={{color: "green"}}> ▲{coins.priceChangePercent}%</td>    
                    :<td style={{color: 'red'}}> ▼{coins.priceChangePercent}%</td>}
                </tr>)
             })
            }
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  )
}