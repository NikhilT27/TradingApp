import gql from "graphql-tag";

export const FETCH_PORTFOLIO_QUERY = gql`
  {
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

export const GET_PORTFOLIO_QUERY = gql`
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
