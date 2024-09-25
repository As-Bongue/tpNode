console.log("point d'entré serveur");

const port = process.env.port || 3000;

const app = require("./application");

app.listen(port, () => {
    console.log(`serveur express sur le port ${port}`);
    
})

