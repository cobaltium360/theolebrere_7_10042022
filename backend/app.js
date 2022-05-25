const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path')
const db = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const adminRoutes = require('./routes/admin');
const likeRoutes = require('./routes/like');
const cors = require('cors');
const helmet = require('helmet');

app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


db.sequelize.sync();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/like', likeRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app; 