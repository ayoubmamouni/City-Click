const mongoose = require("mongoose");
const cityClick = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    cityClicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cityclick", cityClick);
