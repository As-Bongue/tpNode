const jwt = require("jsonwebtoken");

require('dotenv').config() // permet de charger les variables d'environnements

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("jwt token : " + token);
        const decodeToken = jwt.verify(token, process.env.TOKENSECRET);
        console.log(decodeToken);

        const userId = decodeToken.userId;
        const expirationTime = decodeToken.exp;

        // date d'expiration du token qui est diferent de sa validité
        const dateExpire = new Date(expirationTime * 1000);
        console.log(dateExpire);
        
        // si ll'utilisateur envoie un body contenant un id utilisateur surtout si celà ne correspond à son ID
        if (req.body.userId && req.body.userId !== userId) {
            console.log("erreur mauvais token");
            throw "user ID non valide";
        }else{
            // ajouton le userId dans la requete
            req.auth = {userId: userId};
            console.log("le test de log est passé crud operationnel " +req.auth.userId);
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: "req non authentifié"
        });
    }
}