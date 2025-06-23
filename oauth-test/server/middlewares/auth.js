require("dotenv").config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const token = req.cookies.token;
        console.log(`middleware jwt token: ${token}`);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(`decoded user: ${JSON.stringify(decoded)}`);
        next();
    } catch(err) {
        res.status(403).json({ message: "invalid token" });
    }
}

module.exports = verifyToken;
