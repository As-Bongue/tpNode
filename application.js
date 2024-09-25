const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config() // permet de charger les variables d'environnements

const app = express();

const corsOption = require("./midlewares/corsOption");

const immoRoutes = require("./routes/immobilier");
const proprietaireRoutes = require("./routes/proprietaire");
const path = require("path");

/////////// midlewares ///////////

const morgan = require("./midlewares/infosRequete");
const bodyParser = require("./midlewares/parseurDonnées");
const helmet = require("helmet");
const cookiesSession = require("cookie-session");
const nocache = require("nocache");
// permet de parser les données en js
app.use(bodyParser);

// morgan permet de voir le type de requetes et les infos
app.use(morgan);

// securiser les entêtes (voir la doc)
app.use(helmet());

// securiser la session avec http only et changer de nom de session par defaut
app.use(cookiesSession({
    name: "session",
    secret: process.env.SECRETSESSION,
    cookie: {
        secure: true,
        httpOnly: true,
        domain: process.env.DOMAIN
    }
}
));

// appel de fonction desactive le cache
app.use(nocache());

app.use(corsOption);

// permet d'afficher les images depuis le navigateur avec la methode path
app.use("/images", express.static(path.join(__dirname, "images")));

//////////////////////////////////////////

// connection à la bd avec mongose utilisant les variables d'environnements
mongoose.connect(process.env.DB)
  .then(() => console.log('Connected!'))
  .catch(() => console.log("Connexion fail"));

app.use("/api/immobilier", immoRoutes);
app.use("/api/user", proprietaireRoutes);

// exemple de GET depuis application directement sans mvc
app.get("", (req, res) => {
    console.log(req);
    res.status(200);
    res.send("application fontionnel");
})

console.log("application executé");

module.exports = app;