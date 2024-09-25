const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const Proprietaire = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    telephone: {type: String, validate: /^[0-9]{10}$/, required: true},
},
 {timestamps: true},
);

Proprietaire.plugin(uniqueValidator);

module.exports = mongoose.model("User", Proprietaire);