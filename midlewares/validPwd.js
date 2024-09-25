const passSchema = require("../models/passSchema");

module.exports = (req, res, next) => {
    return !passSchema.validate(req.body.password)
        ? res.status(400).json({ 
            error: "mot de passe pas assez fort ! au moins une majuscule, minuscule 2 chiffre min 8 charactères max 30"
         })
        : next();
};
