const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String },//, unique: true, required: true },
    password: String,
    // isAdmin: Boolean,
    portfolio: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" },
    valuePath: { type: mongoose.Schema.Types.ObjectId, ref: "ValuePath" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;