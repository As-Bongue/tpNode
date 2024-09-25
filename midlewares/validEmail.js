const emailSchema = require("validator");

module.exports = (req, res, next) => {
    return !emailSchema.isEmail(req.body.email)
        ? res.status(400).json({ error: "format email invalide" })
        : next();
};
