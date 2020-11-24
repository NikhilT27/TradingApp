import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { PlusIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

import SelectedStocks from "../components/SelectedStocks";
import ClickedPortfolioStocks from "../components/ClickedPortfolioStocks";

export default function Portfolio() {
  const [portfolioClicked, setPortfolioClicked] = useState(false);
  const { loading, error, data } = useQuery(GET_PORTFOLIO_QUERY);
  if (loading)
    return (
      <div className="loader-box">
        <div class="loader"></div>
      </div>
    );
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <div className={portfolioClicked ? "frame-box-transparent" : "frame-box"}>
        <div
          className="portfolio-box"
          onClick={() => setPortfolioClicked(true)}
        >
          <div className="user-portfolio-box">
            <div className="user-portfolio-details">
              <div className="user-portfolio-title-home">
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
      {portfolioClicked ? (
        <div className="portfolio-clicked">
          <div>
            <div className="portfolio-clicked-innerBox">
              <div className="user-portfolio-title">
                <div>
                  <h2>Arpit Sanghiv (P1)</h2>
                </div>
                <div className="user-portfolio-pl">
                  <div>
                    <h2>+7.34%</h2>
                  </div>
                  <div className="buy-icon"></div>
                </div>
              </div>
              <div>
                <div className="clicked-portfolio-details">
                  <div className="portfolio-name">
                    <h4>Name</h4>
                  </div>
                  <div className="portfolio-brought-price">
                    <h4>Brought price</h4>
                  </div>
                  <div className="portfolio-current-price">
                    <h4>Current price</h4>
                  </div>
                  <div className="portfolio-change">
                    <h4>%Change</h4>
                  </div>
                </div>
                <ClickedPortfolioStocks queryData={data} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {portfolioClicked ? (
        <div>
          <div className="portfolio-dismiss-box">
            <button
              className="portfolio-dismiss-button"
              onClick={() => setPortfolioClicked(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : (
        <div className="add-stocks-floating-button">
          <Link to="/addstock">
            <button className="stock-add-button">
              <PlusIcon size={24} />
            </button>
          </Link>
        </div>
      )}
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
