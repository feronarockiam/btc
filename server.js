const express = require('express');
const app = express();
const Submission = require('./schema');
const path = require("path");
const mongoose = require('mongoose');
let name;
let email;
let phone;
let date;
let message;

// Connect to MongoDB
mongoose.connect('mongodb+srv://btc:iamarnauld@cluster0.yl0rlsf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('views'));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/login", (req, res) => {
  res.render('login');
});

app.post("/submit", (req, res) => {
  const username = req.body.name;
  const password = req.body.password;

  if (username === "admin" && password === "123") {
    Submission.find()
      .then(submissions => {
        res.render('welcome', { submissions });
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
        res.redirect('/'); // Handle error - redirect to home page or error page
      });
  } else {
    res.redirect('/login');
  }
});

app.get('/submit', (req, res) => {
    Submission.find()
    .then(submissions => {
      res.render('welcome', { submissions });
    })
    .catch(error => {
      console.error('Error fetching submissions:', error);
      res.redirect('/'); // Handle error - redirect to home page or error page
    });
});

app.post('/process', (req, res) => {
  name = req.body.name;
  email = req.body.email;
  phone = req.body.phone;
  date = req.body.date;
  message = req.body.message;

  const submission = new Submission({
    name,
    email,
    phone,
    date,
    message,
  });

  submission.save()
    .then(() => {
      res.redirect(303, '/');
    })
    .catch(error => {
      console.error('Error saving submission:', error);
      res.redirect(303, '/'); // Handle error - redirect to home page or error page
    });
});

app.post('/delete/:id', (req, res) => {
  const submissionId = req.params.id;

  Submission.findByIdAndDelete(submissionId)
    .then(() => {
      res.redirect(303, '/submit');
    })
    .catch(error => {
      console.error('Error deleting submission:', error);
      res.redirect(303, '/submit'); // Handle error - redirect to home page or error page
    });
});

app.listen(2000, () => {
  console.log('Server running at http://localhost:2000/');
});
