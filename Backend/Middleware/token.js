const jwt = require("jsonwebtoken");

require('dotenv').config();
const authenticateToken = (req, res, next) => {
    let token=req.cookies.auth_token;
    if (!token) return res.status(401).json({ error: "Accès refusé" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token invalide" });
        req.user = user;
        next();
    });
};
module.exports={authenticateToken};