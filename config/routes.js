const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('./model-route');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register (req, res) {
  // implement user registration
  try {
    let { username, password } = req.body;

    if(username && password) {
        password = bcrypt.hashSync(password, 12);

        const user = await db.registerUser({ username, password });

        res.status(200).json(user);
    } else {
        res.status(404).json({
            message: 'Missing credentials'
        });
    }
} catch(error) {
    res.status(500).json({
        message: 'Server error while registering user'
    });
}
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { 
      accept: 'application/json' 
    }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ 
        message: 'Error Fetching Jokes', error: err 
      });
    });
}
