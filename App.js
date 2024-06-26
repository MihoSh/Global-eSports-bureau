// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

// Example components
const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/tournaments">Tournaments</Link></li>
      <li><Link to="/news">News</Link></li>
      <li><Link to="/host">Host Tournament</Link></li>
      <li><Link to="/lineup">Lineup</Link></li>
      <li><Link to="/old-tournaments">Old Tournaments</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/collaborate">Collaborate/Affiliate</Link></li>
      <li><Link to="/account">Account</Link></li>
    </ul>
  </nav>
);

const Home = () => (
  <div>
    <h2>Welcome to Gaming Tournaments</h2>
    <p>The ultimate hub for gaming tournaments!</p>
  </div>
);

const Tournaments = () => {
  const [tournaments, setTournaments] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/tournaments')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error fetching tournaments:', error));
  }, []);

  return (
    <div>
      <h2>Tournaments</h2>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament._id}>{tournament.game}: {tournament.details} on {new Date(tournament.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

const News = () => {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/news')
      .then(response => setNews(response.data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div>
      <h2>Official News</h2>
      <ul>
        {news.map(article => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <small>{new Date(article.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HostTournament = () => {
  const [form, setForm] = React.useState({ game: '', details: '', date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/tournaments/add', form)
      .then(response => {
        alert('Tournament added successfully!');
        setForm({ game: '', details: '', date: '' });
      })
      .catch(error => console.error('Error adding tournament:', error));
  };

  return (
    <div>
      <h2>Host a Tournament</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Game:
          <input type="text" name="game" value={form.game} onChange={handleChange} required />
        </label>
        <label>
          Details:
          <input type="text" name="details" value={form.details} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <button type="submit">Host Tournament</button>
      </form>
    </div>
  );
};

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" render={() => <h2>About Us</h2>} />
      <Route path="/tournaments" component={Tournaments} />
      <Route path="/news" component={News} />
      <Route path="/host" component={HostTournament} />
      {/* Add more routes as needed */}
    </Switch>
  </Router>
);

export default App;
