var express = require('express');
var router = express.Router();
let Media = require('../models/Media');

router.get('/', async (req, res) => {
    let medias = await Media.find();
    res.render('index', { 
    medias});
});
router.post("/new", async (req, res) => {
  let mediaObj = req.body;
  let media = new Media(mediaObj);
  console.log(mediaObj);
  await media.save();
  res.redirect("/");
});

router.get('/new', function(req, res) {
  res.render('newForm');
});
router.delete('/medias/:id', async (req, res) => {
    try {
        await Media.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error deleting the media');
  }
});

module.exports = router;
