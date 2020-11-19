import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";

function Stock(symbol, basevalue) {
  return (
    <div className="stock">
      <div className="stock-logo">Logo</div>
      <div className="stock-detail">
        <div>
          <h5>{symbol}</h5>
        </div>
        <div>
          <h5 style={{ fontWeight: "100" }}>Pharma | Selected by 38.12%</h5>
        </div>
        <div className="stock-price">
          <div>
            <h5>{`$${basevalue}`}</h5>
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
  );
}

export default Stock;
