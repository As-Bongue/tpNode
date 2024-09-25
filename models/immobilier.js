const mongoose = require("mongoose");

const Immobilier = new mongoose.Schema({
    type: {type: String, enum: ["appartement", "maison", "terrain", "garage"], required: true},
    titre: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    categorie: {type: String, enum: ["location", "vente"]},
    annee: {type: Number, min: 2020},
    etat: {type: String, enum: ["neuf", "occasion"]},
    surfaceHabitat: {type: Number, min: 10},
    surfaceTotal: {type: Number, min: 0, required: true},
    jardin: {type: String, enum: ["oui", "non"]},
    ville: { type: String, required: true},
    adresse: {type: String, required: true},
    postal: {type: Number, required: true},
    proprietaire : {type: mongoose.Types.ObjectId, ref: "User"}
},
 {timestamps: true},
);

module.exports = mongoose.model("Immo", Immobilier);