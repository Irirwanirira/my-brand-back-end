import Joi from "joi";
const validator = Joi.object({
    comment: Joi.string().required(),
    author: Joi.string().required(),
});
const commentValidator = (req, res, next) => {
    const payload = req.body;
    const { error } = validator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message,
        });
    }
    next();
};
export default commentValidator;
