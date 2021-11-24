const mongoose = require("mongoose");
const cityClick = new mongoose.Schema(
  {
    click: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cityclick", cityClick);
