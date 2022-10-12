const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const countrySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  states: [
    {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
  ],
  continent: {
    type: String,
  },
  population: {
    type: Number,
    required: true,
  },
  ethnicity: {
    type: String,
  },
  neighbouring: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
  area: {
    type: String,
  },
});

let Country = mongoose.model("Country", countrySchema);
module.exports = Country;