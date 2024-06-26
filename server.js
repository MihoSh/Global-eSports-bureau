// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gaming_tournaments', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MongoDB models (example schemas)
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String
}));

const Tournament = mongoose.model('Tournament', new mongoose.Schema({
  game: String,
  details: String,
  date: Date
}));

const News = mongoose.model('News', new mongoose.Schema({
  title: String,
  content: String,
  date: Date
}));

// API routes
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    res.json(users);
  });
});

app.post('/users/create', (req, res) => {
  const newUser = new User(req.body);
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    res.send('User created successfully');
  });
});

app.get('/tournaments', (req, res) => {
  Tournament.find({}, (err, tournaments) => {
    if (err) return res.status(500).send(err);
    res.json(tournaments);
  });
});

app.post('/tournaments/add', (req, res) => {
  const newTournament = new Tournament(req.body);
  newTournament.save(err => {
    if (err) return res.status(500).send(err);
    res.send('Tournament added successfully');
  });
});

app.get('/news', (req, res) => {
  News.find({}, (err, news) => {
    if (err) return res.status(500).send(err);
    res.json(news);
  });
});

app.post('/news/add', (req, res) => {
  const newArticle = new News(req.body);
  newArticle.save(err => {
    if (err) return res.status(500).send(err);
    res.send('News article added successfully');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
