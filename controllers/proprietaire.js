const user = require("../models/proprietaire");

require('dotenv').config() // permet de charger les variables d'environnements

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.singUp = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
          .then((pwdHash) => {
            const proprietaire = new user({
                email: req.body.email,
                password: pwdHash,
                name: req.body.name,
                telephone: req.body.telephone
            });

            proprietaire.save()
                        .then(() => res.status(200).json({message: "proprietaire creer"}))
                        .catch((error) => res.status(400).json({error}));
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          })
}

exports.login = (req, res, next) => {
    user.findOne({email: req.body.email})
        .then((proprio) => {
            console.log(proprio);
            if (!proprio) {
                return res.status(401).json({error: "utilisateur non trouvé !"});
            }
            bcrypt.compare(req.body.password, proprio.password)
                  .then((valid) => {
                    console.log(valid);
                    if (!valid) {
                        return res.status(401).json({error: "login ou mot de passe incorrect"});
                    }
                    console.log(proprio);
                    res.status(200).json({
                        userId: proprio._id,
                        token: jwt.sign({userId: proprio._id}, process.env.TOKENSECRET, {expiresIn: "1h"})
                    });
                  })
        }).catch((error) => res.status(500).json({error}));
}