const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); 

const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
