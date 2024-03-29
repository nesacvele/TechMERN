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
        const newUser = new Users(req.body);
        const saveNewUser = await newUser.save();
        await new Email({ email: saveNewUser.email, username: saveNewUser.username }, 'http://localhost:5173/').sendWelcome();
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
    const user = await Users.findOne({ email: req.body.email }).select('+password');
    if (!user) {
        return next(new AppError('Ovakav korisnik ne postoji, molimo registrujte se', 401));
    }

    // * Proveravamo password
    const isCorrectPassword = await user.isCorrectPassword(req.body.password, user.password);
    if (!isCorrectPassword) return next(new AppError('Netacni kredencijali', 401));

    // * Izbacujemo password
    const { password, _id, __v, ...userData } = user.toObject();

    return res.status(200).json({
        status: 'success',
        user: userData,
    });
});
