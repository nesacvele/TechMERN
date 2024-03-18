const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const Email = require('../utils/Email');
const catchAsync = require('../utils/catchAsync');

// * =====================
// * ===== REGISTER ======
// * =====================
exports.register = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
        console.log(req.body, 'body');
        const newUser = new Users(req.body);
        const saveNewUser = await newUser.save();
        await new Email(req.body, 'www.localhost.com').sendWelcome();
        return res.status(200).json({
            status: 'success',
            message: 'User uspesno registrovan',
        });
    } else {
        return next(new AppError('Ovakav korisnik vec postoji', 409));
    }
});

// * ==================
// * ===== LOGIN ======
// * ==================
exports.login = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('Ovakav korisnik ne postoji, molimo registrujte se', 401));
    }
    if (user.password === req.body.password) {
        return res.status(200).json({
            status: 'success',
            message: 'Uspesno ste se logovali',
        });
    } else {
        return next(new AppError('Netacni kredencijali', 401));
    }
});
