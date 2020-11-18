const { gql } = require("apollo-server");

module.exports = gql`
  type Book {
    title: String
    author: String
  }

  type CompanyStocks {
    id: ID!
    name: String!
    pickedPrice: String!
    buy: Boolean!
    sell: Boolean!
    purchaseAt: String!
  }

  type Query {
    books: [Book]
    getPortfolio: [CompanyStocks]!
    getStock(id: ID!): CompanyStocks!
  }

  input TradeOption {
    name: String!
    pickedPrice: String!
    buy: Boolean!
    sell: Boolean!
  }
  type Mutation {
    addStock(tradeOption: TradeOption!): CompanyStocks!
    removeStock(id: ID!): String!
  }
`;
