var express = require('express');
const bcrypt = require("bcryptjs");
var router = express.Router();
let Book = require('../models/Book');
let User = require('../models/User');
let sessionauth = require("../middleware/sesssionauth");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/", async (req, res) => {
  let bookObj = req.body;
  let book = new Book(bookObj);
  console.log(bookObj);
  await book.save();
  res.redirect("/books");
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  req.setFlash("danger", "Logged out!");
  // req.session.flash = { type: "success", message: "Logged Out Successfully!" };
  res.redirect("/");
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.setFlash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", async (req, res) => {
  // await User.deleteMany({});
  //   return res.send(req.body);
  let userObj = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  res.redirect("/books");
});
router.get("/", async (req, res) => {
  let books = await Book.find();
  return res.send(books);
  
});
router.get("/books", async (req, res) => {
  let books = await Book.find();
  //   return res.send(deals);
  res.render("booksView", {
    books,
    pageTitle: "Top Books",
  });
});

// Update Book - PUT
router.put('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id; // Get the book ID from the URL params
    const updatedBookData = req.body; // Get the updated book details from the request body

    // Update the book in the database using the book ID
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true, // Return the updated book
      runValidators: true, // Run validation on the updated book data
    });

    if (!updatedBook) {
      // Book with the provided ID not found
      return res.status(404).send("Book not found");
    }

    // Redirect the user to the updated book's details page or any other appropriate location
    res.redirect("/books");
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/books/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      // Handle the case if the book is not found
      return res.status(404).send('Book not found');
    }

    res.render('editBook', {
      pageTitle: 'Edit Book',
      book: book  // Pass the book object to the template
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    // Find the book by ID and delete it
    await Book.findByIdAndDelete(req.params.id);
    // Redirect the user to a specific page or perform any other necessary action
    res.redirect('/books'); // Redirect to the books listing page after deletion
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.log(error);
    res.status(500).send('Error deleting the book');
  }
});

module.exports = router;
