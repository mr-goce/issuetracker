const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
     const token = req.header('x-auth-token');
        if (!token) {
        return res.status(401).send('You dont have an authorization  !!!');

    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send('Token is not valid');
    } 
}