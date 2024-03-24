const jwt = require('jsonwebtoken');
require("dotenv").config();

const Authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Login first' });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    });
}

module.exports = { Authenticate }