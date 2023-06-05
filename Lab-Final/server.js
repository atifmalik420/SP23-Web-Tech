var express = require('express');
var path = require('path');
const methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/new', indexRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3000, () => {
  console.log("Server Started");
});
const mongoose = require("mongoose");
  mongoose
  .connect("mongodb+srv://gujjar:gujjar@cluster0.yfypdu0.mongodb.net/LabExam?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));


module.exports = app;
