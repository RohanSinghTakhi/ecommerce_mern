const express = require('express')
const router = express.Router()
const User = require("../../models/User") // Assuming your User model is in the "models" directory
const jwt = require('jsonwebtoken');

router.post('/admin/Signin', async (req, res) => {
    try {
        // Use async/await to handle the query
        const user = await User.findOne({ email: req.body.email }).exec();

        if (user) {
            // Check if the password matches using the authenticate method
            if (user.authenticate(req.body.password) && user.role === "admin" ) {
                // Generate a JWT token
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                // Destructure user fields to return in the response
                const { firstName, lastName, email, role, fullName } = user;

                // Send response with user details and token
                return res.status(200).json({
                    token, // Return the token
                    user: { firstName, lastName, email, role, fullName }
                });
            } else {
                // Invalid password
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }
        } else {
            // User not found
            return res.status(400).json({
                message: "User not found"
            });
        }
    } catch (error) {
        // Log the full error details for debugging
        console.error("Error during Signin:", error);

        // Handle errors
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});


router.post('/admin/Signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email }).exec();

        if (userExists) {
            return res.status(400).json({ message: "admin already registered" });
        }

        // Generate a unique userActivationName
        const userActivationName = Math.random().toString(36).substring(2, 15);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            userActivationName, // Include the generated userActivationName
            role:"admin",
            username: Math.random().toString() // If you still want to generate a username
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        return res.status(201).json({ user: savedUser });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
});



module.exports = router
