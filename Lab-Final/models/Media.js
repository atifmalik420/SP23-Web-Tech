const mongoose = require('mongoose');
let modelSchema = mongoose.Schema({
    filename: String,
    filetype: String,
    size: String,
    extension: String,
  });
  let Model = mongoose.model("Media", modelSchema);
  module.exports = Model;