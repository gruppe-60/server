const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Auth.findById(decoded.userId);
        console.log(user);
        if (!user) {
        return res.status(401).json({ message: "not authorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "not authorized" });
    }
}

module.export = { authenticate };