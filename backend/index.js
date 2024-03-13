const express = require('express');
const cors = require('cors');
const app = express();

// * Models
const Users = require('./models/userModel');
console.log(Users, 'users');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * Register
// * ==========
app.post('/register', async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        console.log(user, 'user');
        console.log(req.body, 'req.body');
        if (!user) {
            const newUser = new Users(req.body);
            console.log(newUser, 'newUser');

            try {
                const saveNewUser = await newUser.save();
                console.log(saveNewUser, 'saveNewUser');
                return res.status(200).json({
                    status: 'success',
                    message: 'User uspesno registrovan',
                });
            } catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Nije sacuvan user u bazi',
                });
            }
        } else {
            return res.status(409).json({
                status: 'fail',
                message: 'Ovakav korisnik vec postoji',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Greska na serveru',
        });
    }
});

// * Login
// * =========
app.post('/login', async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        console.log(user, 'user');
        if (user) {
            if (user.password === req.body.password) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Uspesno ste se logovali',
                });
            } else {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Netacani kredencijali',
                });
            }
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'Ovakav korisnik vec ne postoji',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Greska na serveru',
        });
    }
});

module.exports = app;
