const express = require('express')
const router = express.Router()
const User = require("../models/User") // Assuming your User model is in the "models" directory
const jwt = require('jsonwebtoken');

router.post('/Signin', async (req, res) => {
    try {
        // Use async/await to handle the query
        const user = await User.findOne({ email: req.body.email }).exec();

        if (user) {
            // Check if the password matches using the authenticate method
            if (user.authenticate(req.body.password)) {
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


router.post('/Signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email }).exec();

        if (userExists) {
            return res.status(400).json({ message: "User already registered" });
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
            username: Math.random().toString() // If you still want to generate a username
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        return res.status(201).json({ user: savedUser });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
});



router.post("/profile", (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Get the authorization header
        
        // Check if the authorization header is present
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing!" });
        }
        
        // Extract the token from the 'Bearer token' format
        const token = authHeader.split(" ")[1];
        
        // If the token is missing from the Bearer header
        if (!token) {
            return res.status(401).json({ message: "Authentication failed, token missing!" });
        }

        // Verify the token
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to the request object
        req.user = user;

        // Proceed with the next middleware or send a success response
        res.status(200).json({ message: "Token verified", user: req.user });
    } catch (error) {
        // Handle token verification errors
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
});

module.exports = router
