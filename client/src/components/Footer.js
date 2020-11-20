import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@primer/octicons-react";

export default function Footer({ stocks, buy, sell }) {
  const [swipeUp, setSwipeUp] = useState(false);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/helloWorld`, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  function checkStocks(symbol) {
    return stocks.find((x) => x === symbol);
  }

  function checkBuy(symbol) {
    return buy.find((x) => x === symbol);
  }

  function checkSell(symbol) {
    return sell.find((x) => x === symbol);
  }

  return (
    <div>
      {swipeUp ? (
        <div className="selected-stocks">
          <button className="swipe-button" onClick={() => setSwipeUp(false)}>
            <ChevronDownIcon size={16} />
          </button>
          <div className="swipe-portfolio-box">
            <h4>Arpit Sanghvi (P1)</h4>
            {stocks.length ? (
              <div className="swipe-stocks">
                {data &&
                  data.map((stock) =>
                    checkStocks(stock.symbol) ? (
                      <div
                        key={stock.symbol + stock.symbol + 123}
                        className="swipe-portfolio-detail"
                      >
                        <div className="swipe-logo-symbol">
                          <div className="stock-logo">Logo</div>
                          <div className="swipe-portfolio-stock-symbol">
                            <h4>{stock.symbol}</h4>
                          </div>
                        </div>
                        <div className="stock-price">
                          <div>
                            <h4 style={{ fontWeight: "100" }}>
                              ${stock.basevalue.toFixed(2)}
                            </h4>
                          </div>
                          <div>
                            <h5 style={{ fontWeight: "100" }}>+38.11%</h5>
                          </div>
                        </div>
                        {checkBuy(stock.symbol) ? (
                          <div className="buy-icon"></div>
                        ) : (
                          <div className="sell-icon"></div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )
                  )}
              </div>
            ) : (
              <div className="swipe-stocks-empty">Empty</div>
            )}

            <div>
              <button
                className="swipe-confirm-button"
                disabled={stocks.length ? false : true}
                onClick={() => console.log("confirm")}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="swipe-button" onClick={() => setSwipeUp(true)}>
          <ChevronUpIcon size={16} />
          Swipe to view your PortFolio
        </button>
      )}
    </div>
  );
}
