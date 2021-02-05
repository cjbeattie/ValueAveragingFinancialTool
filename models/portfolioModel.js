const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = Schema({
    heldStocks: [{
        symbol: String,
        targetPercent: Number,
        numHeldUnits: Number,
        currencyCode: String,
        // name: String,
        // currentPrice: Number,
        // priceUpdated: Date,
    }]
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;