// const auth = async (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) {
//         return res.status(401).send('Access denied. No token provided');
//     }
//     try {
//         const decoded = jwt.verify(token, 'jwtPrivateKey');
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         res.status(400).send('Invalid token');
//     }
//     }

// module.exports = auth;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
