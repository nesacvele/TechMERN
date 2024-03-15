const Users = require('../models/userModel');
const AppError = require('../utils/AppError');

// * =====================
// * ===== REGISTER ======
// * =====================
exports.register = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
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
                console.log(err, 'greskaa');
                return next(new AppError('Nije sacuvan user u bazi', 500));
            }
        } else {
            return next(new AppError('Ovakav korisnik vec postoji', 409));
        }
    } catch (err) {
        return next(new AppError('Greska na serveru', 500));
    }
};

// * ==================
// * ===== LOGIN ======
// * ==================
exports.login = async (req, res, next) => {
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
                return next(new AppError('Netacni kredencijali', 401));
            }
        } else {
            return next(new AppError('Netacni kredencijali', 401));
        }
    } catch (err) {
        console.error(err, 'greska');
        return next(new AppError('Greska na serveru', 500));
    }
};
