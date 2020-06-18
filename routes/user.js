const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validateEmail, validateName, validatePassword } = require('../validation')

router.post('/', validateName, validateEmail,  async (req, res) => {

    const { name, email, password } = req.body;

    try {
        let emailCheck = await User.findOne({ email });
        if (emailCheck) {
            res.status(400).send(`User alredy exist !!!`)
        } else {

            let user = new User({
                name, email, password
            })
            const salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
                if (err) throw err;
                res.json({ token })
            })
            // res.send(`user with email : ${email} was created`);

        }

    } catch (error) {
        res.status(500).send('server issues...')
    }





  
})

module.exports = router