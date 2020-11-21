import React from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_PORTFOLIO_QUERY } from "../util/graphQuery";
import axios from "axios";
import useSWR from "swr";

export default function ClickedPortfolioStocks({ queryData }) {
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

  function getCurrentValue(stock) {
    const basevalue = 0;

    const dataIndex = data.findIndex((dataStock) => dataStock.symbol === stock);
    if (dataIndex !== -1) {
      return data[dataIndex].basevalue.toFixed(2);
    }
    return basevalue;
  }

  function getRelativeChange(x, y) {
    const relativeChange = (x - y) / y;
    return relativeChange.toFixed(2);
  }
  return (
    <div>
      {queryData &&
        queryData.getPortfolio.map((stock) => (
          <div key={stock.id} className="clicked-portfolio-details">
            <div className="portfolio-name">
              <div>
                <h4>{stock.name}</h4>
              </div>
              {stock.buy ? (
                <div className="buy-icon"></div>
              ) : (
                <div className="sell-icon"></div>
              )}
            </div>
            <div className="portfolio-brought-price">
              <h4>{parseFloat(stock.pickedPrice).toFixed(2)}</h4>
            </div>
            <div className="portfolio-current-price">
              <h4>{getCurrentValue(stock.name)}</h4>
            </div>
            <div className="portfolio-change">
              <h4>
                {getRelativeChange(
                  getCurrentValue(stock.name),
                  parseFloat(stock.pickedPrice).toFixed(2)
                )}
                %
              </h4>
            </div>
          </div>
        ))}
    </div>
  );
}
