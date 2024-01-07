const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.TOKEN_SEC_KEY;

function createToken(user) {
    const token = jwt.sign({ id: user._id, username: user.username, level: user.level, admin: user.admin },
        secretKey, { expiresIn: '1h' }
    );
    return token;
}

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const tokenString = token.split(' ')[1];

    jwt.verify(tokenString, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken, createToken };