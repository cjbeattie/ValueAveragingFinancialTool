const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const valuePathSchema = Schema({
    investmentGoal: { type: String },//, required: true },
    endDate: Date,
    startDate: Date,
    cycle: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Annually'],
        default: 'Monthly'
    },
    r: Number,
    g: Number,
    currency: String,
    valuePath: [{
        cycleDate: Date,
        cycleValue: Number,
    }]
});

const ValuePath = mongoose.model("ValuePath", valuePathSchema);

module.exports = ValuePath;