const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/AppError');

// * Controllers
const errorController = require('./controllers/errorController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * Routes
app.use('/api/user', userRoutes);

// * 404 error
app.all('*', (req, res, next) => {
    return next(new AppError(`Ova stranica ${req.originalUrl} ne postoji`, 404));
});

// * Global error handler middleware
app.use(errorController);

module.exports = app;
