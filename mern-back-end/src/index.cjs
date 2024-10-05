const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
env.config();

const bodyParser = require('body-parser');

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Database connection error:', err);
});

// Routes
const AdminRoutes = require('./routes/admin/User.cjs');
const userRoutes = require('./routes/User.cjs');
app.use('/api', userRoutes);
app.use('/api', AdminRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}!`));
