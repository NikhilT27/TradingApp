import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  SearchIcon,
  XCircleFillIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@primer/octicons-react";
import { Dropdown, Grid, Image } from "semantic-ui-react";

import Stock from "../components/Stock";

export default function Home() {
  const [swipeUp, setSwipeUp] = useState(false);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(`/helloWorld`, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
          data.map((stock) => (
            <div key={stock.key} className="stock">
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
                    <h5>{`$${stock.basevalue}`}</h5>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "100" }}>+38.11%</h5>
                  </div>
                </div>
              </div>
              <div className="stock-option">
                <div>
                  <button className="stock-buy">
                    <ChevronUpIcon size={16} />
                    Buy
                  </button>
                </div>
                <div>
                  <button className="stock-sell">
                    Sell
                    <ChevronDownIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="swipe-box">
        <div className={swipeUp ? "swipe-up" : "swipe-down"}>
          <div>
            {!swipeUp && (
              <button className="swipe-title" onClick={() => setSwipeUp(true)}>
                <ChevronUpIcon size={16} />
              </button>
            )}
            {swipeUp && (
              <button className="swipe-title" onClick={() => setSwipeUp(false)}>
                <ChevronDownIcon size={16} />
              </button>
            )}
          </div>
          <div>
            {swipeUp ? (
              <h4>Portfolio</h4>
            ) : (
              <h4>Swipe to view your Portfolio</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
