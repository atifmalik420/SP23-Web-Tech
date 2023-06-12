const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  title: String,
  location: String,
  coveredArea: Number,
  noBeds: Number,
  noFloors: Number,
  price: Number,
  type: String,
  description: String,
});
let Model = mongoose.model("Estate", modelSchema);
module.exports = Model;