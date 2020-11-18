const { model, Schema } = require("mongoose");

const stocksSchema = new Schema({
  name: String,
  pickedPrice: String,
  buy: Boolean,
  sell: Boolean,
  purchaseAt: String,
});

module.exports = model("Stocks", stocksSchema);
