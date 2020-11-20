import React from "react";
import { gql, useQuery } from "@apollo/client";
import { PlusIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

import SelectedStocks from "../components/SelectedStocks";

export default function Portfolio() {
  return (
    <>
      <div className="frame-box">
        <div className="portfolio-box">
          <div className="user-portfolio-box">
            <div className="user-portfolio-details">
              <div className="user-portfolio-title">
                <div>
                  <h4>Arpit Sanghiv (P1)</h4>
                </div>
                <div className="user-portfolio-pl">
                  <div>
                    <h4>+7.34%</h4>
                  </div>
                  <div className="buy-icon"></div>
                </div>
              </div>
              <SelectedStocks />
            </div>
          </div>
        </div>
      </div>
      <div className="add-stocks-floating-button">
        <Link to="/addstock">
          <button
            className="stock-add-button"
            //   onClick={() => console.log("Plus")}
          >
            <PlusIcon size={24} />
          </button>
        </Link>
      </div>
    </>
  );
}

const GET_PORTFOLIO_QUERY = gql`
  query GetPortfolio {
    getPortfolio {
      id
      name
      pickedPrice
      buy
      sell
      purchaseAt
    }
  }
`;
