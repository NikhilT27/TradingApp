const postsResolvers = require("./posts");
const portfolioResolvers = require("./portfolio");

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...portfolioResolvers.Query,
  },

  Mutation: {
    ...portfolioResolvers.Mutation,
  },
};
