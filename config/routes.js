const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./model-route');
const jwtKey = process.env.JWT_SECRET;

const authenticate = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register (req, res) {
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

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if(username && password) {
        const user = await db.getUserBy({ username });

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            });

        } else {
            res.status(404).json({
                message: 'Invalid Credentials'
            });
        }
    } else {
        res.status(404).json({
            message: 'Missing credentials'
        }); 
    }
  } catch(error) {
      res.status(500).json({
          message: 'Server error while logging in user'
      });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { 
      accept: 'application/json',
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

function generateToken(user) {
  const payload = {
      UserId: user.id,
      name: user.username
  }

  const options = {
      expiresIn: '1d'
  }

  return jwt.sign(payload, jwtKey, options);
}
