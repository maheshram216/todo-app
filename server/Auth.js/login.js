const express = require("express");
const Schema = require("../Models/UserSchema");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = 'secret'

const routes = express.Router();

routes.post('/signup', body('username').isEmail(), body('password').isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body

            const user = await Schema.findOne({ username })
            if (user) {
                return res.status(400).json({ errors: 'user exist' });
            }


            bcrypt.hash(password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(400).json({ errors: err.array() });
                }
                const data = await Schema.create({
                    username,
                    password: hash
                });
                res.json({
                    status: "user created successfully",
                    data
                });
            });


        } catch (error) {
            res.status(400).json({
                status: "falied",
                message: error.message
            })
        }

    });

routes.post('/login', body('username').isEmail(), body('password').isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body
            const user = await Schema.findOne({ username })
            if (!user) {
                return res.status(400).json({ status: "user not exist" });
            }

            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (err) {
                    return res.status(400).json({ errors: 'failed' });
                }
                if (result) {

                    const token = jwt.sign({
                        data: user.id
                    }, secret, {
                        expiresIn: '10h'
                    });

                    return res.status(200).json({
                        status: "login successfull",
                        token
                    })
                } else {
                    return res.status(400).json({
                        status: "falied",
                        message: "invalid password"
                    })
                }
            });
        } catch (error) {
            res.status(400).json({
                status: "falied",
                message: error.message
            })
        }

    });
module.exports = routes



