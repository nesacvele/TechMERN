require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./index');

const DB_URL = process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD);

mongoose
    .connect(DB_URL)
    .then((data) => {
        console.log('MongoDB je povezan!');
    })
    .catch((err) => {
        console.log(err, 'MongoDB nije povezan!!!');
    });

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) console.log(err, 'Aplikacija nije pokrenuta');
    else console.log('Aplikacija radi na portu ' + port);
});
