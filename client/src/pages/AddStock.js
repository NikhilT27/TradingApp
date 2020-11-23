import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  SearchIcon,
  XCircleFillIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@primer/octicons-react";
import { Dropdown } from "semantic-ui-react";

import Footer from "../components/Footer";

export default function AddStock() {
  const [stockToBuy, setStockToBuy] = useState([]);
  const [stockToSell, setStockToSell] = useState([]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(`/helloWorld`, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className="loader-box">
        <div class="loader"></div>
      </div>
    );

  function BUYSTOCK(symbol) {
    if ([...stockToSell, ...stockToBuy].length === 10) {
      alert("You can select any 10 Stocks");
    } else {
      setStockToBuy([...stockToBuy, symbol]);
    }
    console.log(`BUY: ${symbol}`);
  }

  function SELLSTOCK(symbol) {
    if ([...stockToSell, ...stockToBuy].length === 10) {
      alert("You can select any 10 Stocks");
    } else {
      setStockToSell([...stockToSell, symbol]);
    }
    console.log(`Sell: ${symbol}`);
  }

  function REMOVESTOCK(symbol) {
    if (stockToBuy.indexOf(symbol) !== -1) {
      stockToBuy.splice(stockToBuy.indexOf(symbol), 1);
    }

    if (stockToSell.indexOf(symbol) !== -1) {
      stockToSell.splice(stockToSell.indexOf(symbol), 1);
    }
  }

  function checkBuy(symbol) {
    return stockToBuy.find((x) => x === symbol);
  }

  function checkSell(symbol) {
    return stockToSell.find((x) => x === symbol);
  }

  return (
    <>
      <div className="select-info">
        <p>You can select any 10 stocks from the list to create a portfolio</p>
      </div>
      <div className="stocks-option">
        <div className="search-stocks">
          <SearchIcon size={16} />
          <input
            type="search"
            style={{ border: "none" }}
            placeholder="Search"
          ></input>
          <XCircleFillIcon size={16} />
        </div>
        <div className="sort-stocks">
          <Dropdown text="Sort & Filter">
            <Dropdown.Menu>
              <Dropdown.Item text="Sort Price" />
              <Dropdown.Item text="Sort Name" />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="stocks-view">
        {data &&
          data.map((stock) => {
            return (
              <div
                key={stock.symbol + stock.symbol + 123}
                className={
                  checkBuy(stock.symbol)
                    ? "stock stock-color-buy"
                    : checkSell(stock.symbol)
                    ? "stock stock-color-sell"
                    : "stock"
                }
              >
                <div className="stock-logo">Logo</div>
                <div className="stock-detail">
                  <div>
                    <h5>{stock.symbol}</h5>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "100" }}>
                      Pharma | Selected by 38.12%
                    </h5>
                  </div>
                  <div className="stock-price">
                    <div>
                      <h5>{`$${stock.basevalue.toFixed(2)}`}</h5>
                    </div>
                    <div>
                      <h5 style={{ fontWeight: "100" }}>+38.11%</h5>
                    </div>
                  </div>
                </div>
                {checkBuy(stock.symbol) || checkSell(stock.symbol) ? (
                  <div className="stock-option">
                    <button
                      className="stock-cancel"
                      onClick={() => REMOVESTOCK(stock.symbol)}
                    >
                      <XCircleFillIcon size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="stock-option">
                    <div>
                      <button
                        className="stock-buy"
                        onClick={() => BUYSTOCK(stock.symbol)}
                      >
                        <ChevronUpIcon size={16} />
                        Buy
                      </button>
                    </div>
                    <div>
                      <button
                        className="stock-sell"
                        onClick={() => SELLSTOCK(stock.symbol)}
                      >
                        Sell
                        <ChevronDownIcon size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <Footer
        buy={[...stockToBuy]}
        sell={[...stockToSell]}
        stocks={[...stockToBuy, ...stockToSell]}
      />
    </>
  );
}
