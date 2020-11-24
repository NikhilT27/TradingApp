import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@primer/octicons-react";
import { gql, useMutation } from "@apollo/client";

import FetchSWR from "../util/FetchSWR";

export default function Footer({ stocks, buy }) {
  const [swipeUp, setSwipeUp] = useState(false);
  const { data, error } = FetchSWR();

  const [confirmStock] = useMutation(ADD_STOCK_QUERY);
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className="loader-box">
        <div class="loader"></div>
      </div>
    );

  function checkStocks(symbol) {
    return stocks.find((x) => x === symbol);
  }

  function checkBuy(symbol) {
    return buy.find((x) => x === symbol);
  }

  function ConfirmStocks() {
    if (stocks.length) {
      stocks.map((stock) => {
        if (checkBuy(stock)) {
          console.log(`Innside confirm: ${stock}`);
          const { basevalue } = data.find(
            (dataStock) => dataStock.symbol === stock
          );
          confirmStock({
            variables: {
              name: stock,
              pickedPrice: basevalue.toString(),
              buy: true,
              sell: false,
            },
          });
        } else {
          const { basevalue } = data.find(
            (dataStock) => dataStock.symbol === stock
          );
          confirmStock({
            variables: {
              name: stock,
              pickedPrice: basevalue.toString(),
              buy: false,
              sell: true,
            },
          });
        }
      });
    }
    console.log(`buy: ${buy}`);
    console.log(`confirm: ${stocks}`);
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
                        key={
                          stock.symbol +
                          Math.floor(Math.random() * Math.floor(1000))
                        }
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
                onClick={() => ConfirmStocks()}
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

const ADD_STOCK_QUERY = gql`
  mutation AddStock(
    $name: String!
    $pickedPrice: String!
    $buy: Boolean!
    $sell: Boolean!
  ) {
    addStock(
      tradeOption: {
        name: $name
        pickedPrice: $pickedPrice
        buy: $buy
        sell: $sell
      }
    ) {
      id
      name
      pickedPrice
      buy
      sell
      purchaseAt
    }
  }
`;
