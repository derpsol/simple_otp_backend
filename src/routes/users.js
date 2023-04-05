const express = require('express');

const router = express.Router();

const { Users } = require('../models');
const { Email } = require('../services');

router.post('/register',
    async (req, res) => {
        const user = new Users(req.body);
        const emailCode = Math.floor(Math.pow(10, (parseInt(user.digit) - 1)) + Math.random() * 9 * Math.pow(10, (parseInt(user.digit) - 1)));
        try {
            await Email.send(user.email, 'Account validation', `Laborhutt - Your validation code is ${emailCode}`);
        } catch(e) {
            console.log(e)
            return res.status(400).send(e.message)
        }

        user.validations.email.code = emailCode
        await user.save()
        return res.status(201).json({ message: 'User registered', user, smsCode, emailCode, tokenGS });
    });

router.post(
    '/validate',
    async (req, res) => {
        const { type, code, _id } = req.body;

        try {
            await Users.validateInfo(_id, type, code);
            return res.json({ message: `User ${type} verified` });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    },
);

module.exports = router;
