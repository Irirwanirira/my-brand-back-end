import joi from 'joi';
const registerValidator = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(7).trim(true).required(),
    //   role: joi.string().valid('admin', 'user').required(),
});
const login = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(7).trim(true).required(),
});
const userValidator = (req, res, next) => {
    const payload = req.body;
    const { error } = registerValidator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
const loginValidator = (req, res, next) => {
    const payload = req.body;
    const { error } = login.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
export { userValidator, loginValidator };
