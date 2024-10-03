const express = require('express')
const router = express.Router()
const User = require("../models/User") // Assuming your User model is in the "models" directory

router.post('/Signin', (req, res) => res.send('Hello World!'))

router.post('/Signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered"
            })
        }

        const { firstName, lastName, email, password } = req.body
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        })

        const newUser = await _user.save()
        return res.status(201).json({
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
})

module.exports = router
