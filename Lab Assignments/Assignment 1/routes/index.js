const express = require("express");
let Estate = require("../models/Estate");
let router = express.Router();
router.get("/buy", async (req, res) => {
    let estates = await Estate.find();
    res.render("buy", {
      estates,
    });
  });
router.get("/sell",async (req, res) => {
    res.render("sell");
});
router.post("/sell", async (req, res) => {
    let estateObj = req.body;
    let estate = new Estate(estateObj);
    await estate.save();
    res.redirect("/buy");
  });
router.get("/rent",async (req, res) => {
    res.render("rent");
});
router.get("/blog",async (req, res) => {
    res.render("blog");
});
router.get("/news",async (req, res) => {
    res.render("news");
});
router.get("/about",async (req, res) => {
    res.render("about");
});
router.get("/contact",async (req, res) => {
    res.render("contact");
});

module.exports = router;
