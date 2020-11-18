const { get } = require("mongoose");

const Stocks = require("../../models/Stocks");

// async function fetchData() {
//   try {
//     await axios
//       .get(
//         "https://us-central1-stock-fantasy-fd46e.cloudfunctions.net/helloWorld"
//       )
//       .then((response) => {
//         console.log(`Data: ${response.data}`);
//         allStocks = [...response.data];
//       });
//     // set the time below to how frequently you wanna update
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  Query: {
    async getPortfolio() {
      try {
        const stocks = await Stocks.find().sort({ createdAt: -1 });
        return stocks;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getStock(_, { id }) {
      try {
        const stock = await Stocks.findById(id);
        if (stock) {
          return stock;
        } else {
          throw new Error("Stock not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async addStock(_, { tradeOption: { name, pickedPrice, buy, sell } }) {
      const newStock = new Stocks({
        name,
        pickedPrice,
        buy,
        sell,
        purchaseAt: new Date().toISOString(),
      });
      const stock = await newStock.save();
      return stock;
    },

    async removeStock(_, { id }) {
      try {
        const stock = await Stocks.findById(id);
        await stock.delete();
        return "Stock removed successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
