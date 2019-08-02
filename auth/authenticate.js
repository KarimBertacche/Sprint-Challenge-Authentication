const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      } else  {
        req.decoded = decoded;
  
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};