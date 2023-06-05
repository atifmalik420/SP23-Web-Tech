const mongoose = require('mongoose');
let modelSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    description: String,
  });
  let Model = mongoose.model("Book", modelSchema);
  module.exports = Model;