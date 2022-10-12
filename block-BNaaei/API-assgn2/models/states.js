const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let stateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  countryname: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  population: {
    type: Number,
    require: true,
  },
  area: {
    type: String,
  },
  neighbouringState: [
    {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
  ],
});
let State = mongoose.model("State", stateSchema);
module.exports = State;