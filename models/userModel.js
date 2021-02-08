const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    // username: { type: String },//, unique: true, required: true },
    // password: String,
    // isAdmin: Boolean,
    portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
    valuePaths: [{ type: mongoose.Schema.Types.ObjectId, ref: "ValuePath" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;