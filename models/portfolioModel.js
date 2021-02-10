const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = Schema({
    heldStocks: [{
        symbol: String,
        name: String,
        currencyCode: String,
        targetPercent: Number,
        numHeldUnits: Number,
        // currentPrice: Number,
        // priceUpdated: Date,
    }]
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;