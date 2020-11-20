import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { HorizontalRuleIcon } from "@primer/octicons-react";

export default function SelectedStocks() {
  const { loading, error, data } = useQuery(GET_PORTFOLIO_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div className="user-portfolio-stocks">
        {data &&
          data.getPortfolio.map((stock) => (
            <div key={stock.id} className="user-portfolio-each-stock">
              <div className="padding-portfolio-stocks">
                <HorizontalRuleIcon size={16} />
              </div>
              <div className="padding-portfolio-stocks">
                <h4>{stock.name}</h4>
              </div>
              <div className="buy-icon"></div>
            </div>
          ))}
      </div>
    </div>
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
