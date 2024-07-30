const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRoutes = require('./routes/users');
const storyRoutes = require('./routes/stories');
const donationRoutes = require('./routes/donations');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));