const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = Schema({
    stock: [{
        ticker: String,
        targetPercent: Number,
        numHeldUnits: Number,
        price: Number,
        priceUpdated: Date,
    }]
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;