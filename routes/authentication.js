const express = require('express');
const router = express.Router();
const User= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const routeAuthorization = require('../routeAuthorization');
const { validateEmail,  validateName } = require('../validation')

// PRIVATE ROUTE
router.get('/', routeAuthorization, async(req, res) => {
    // res.send('Get a user')
try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
} catch (error) {
    res.status(500).send('Server Issue...')
}
})


// PUBLIC route
router.post("/",validateName, async (req, res) => {
    // res.send('Log in user')
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("invalid credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid Credentials");
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err;
            res.json({ token })
        })
    } catch (error) {
        res.status(500).send("server error");
    }
})




module.exports = router