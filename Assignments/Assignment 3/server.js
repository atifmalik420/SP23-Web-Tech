const express = require("express");
const app=express();
var path = require('path');
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
app.use((req, res, next) => {
  // res.send("site is down for maintenance");
  console.log(req.url);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.get("/", (req, res) => {
  res.render("homepage");
});
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(4000, () => {
  console.log("Server Started");
});
const mongoose = require("mongoose");
  mongoose
  .connect("mongodb+srv://gujjar:gujjar@cluster0.yfypdu0.mongodb.net/Project?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
