const immobilier = require("../models/immobilier"); // reccupere le model immobilier

const fs = require("fs"); // module node permettant de gerer les fichier

// logique de controle des routes immobilier

// controle de la route GET de tout les immobiliers present dans la BD

exports.getAll = (req, res) => {
    immobilier.find()
    .then((elements) => {
        console.log("liste complete des immobiliers");
        res.status(200).json(elements);
    })
    .catch((error) => res.status(500).json({error}));
}

exports.getOne = (req, res) => {
    immobilier.findOne({_id: req.params.id})
    .populate({path: "proprietaire", select: "name telephone"})
    .then((element) => {
        console.log("unique immobilier");
        res.status(200).json(element);
    })
    .catch((error) => res.status(500).json({error}));
}

exports.createOne = async (req, res) => {
    const immoFleImage = req.file;
    const immoData = JSON.parse(req.body.data);

    // suppression par mesure de securité de l'identifiant de l'identifiant s'il est envoyé car mongoose le gère automatiquement
    delete immoData._id;
    // suppression egalement du proprietaire au cas ou car nous recuperons son id injecté dans la requete après son authentification afin de se rassuré
    delete immoData.proprietaire;

    console.log(immoData);
    console.log(immoFleImage);

    console.log(req.protocol);
    console.log(req.get("host"));

    try {
        const newImmo = await immobilier.create({
            type: immoData.type,
            titre: immoData.titre,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${immoFleImage.filename}`,
            description: immoData.description,
            categorie: immoData.categorie,
            annee: immoData.annee,
            etat: immoData.etat,
            surfaceHabitat: immoData.surfaceHabitat,
            surfaceTotal: immoData.surfaceTotal,
            jardin: immoData.jardin,
            ville: immoData.ville,
            adresse: immoData.adresse,
            postal: immoData.postal,
            proprietaire: req.auth.userId,
        });
        res.status(200).json({message: "bien enregistré avec success !"});
    } catch (err) {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite",
        });
    }
}

exports.updateOne = (req, res) => {
    const id = {_id: req.params.id};

    immobilier.findById(id)
              .then((element) => {                
                if (element !== null) {
                    let immoObjet;

                    const immoImage = element.imageUrl.split('/images/')[1];

                    // verifier si l'article à modifier appartient à l'utilisateur connecté
                    if (element.proprietaire != req.auth.userId) {
                        fs.unlink(`.images/${req.file.filename}`);
                        res.status(401).json({message: "action non autorisé"})
                    } else {
                        //  //// si la requete contient l'objet au complet avec l'image ////////
                        if (req.file && req.body.data) {
                            // supression du fichier avec la methode unlink() du module fs de node
                            fs.unlink(`./images/${immoImage}`, () => console.log("fichier suprimé"));

                            // construction de l'objet en associant l'image
                            immoObjet = {...JSON.parse(req.body.data), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
                            
                        }else if (req.file && !req.body.data) {
                            fs.unlink(`./images/${immoImage}`, () => console.log("fichier suprimé uniquement"));
                            // construction de l'objet contenant uniquement l'image
                            immoObjet = {imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
                        }else if (req.body.data) {
                            immoObjet = {...JSON.parse(req.body.data)};
                        }else{
                            immoObjet = {...req.body};
                        }     
                        // modification de l'objet
                        immobilier.updateOne({_id: req.params.id}, {...immoObjet, _id: req.params.id})
                                .then(() => res.status(200).json({message: "mobilier modifié"}))
                                .catch((error) => res.status(400).json({error, message: "envoie des données eronnées"}));
                    }
                }else{
                    res.status(404).json({message: "immobilier non trouvé"});
                }
              })
             .catch((error) => {res.status(500).json({error})});
}

exports.delateOne = (req, res) => {
    const id = {_id: req.params.id};

    immobilier.findById(id)
              .then((element) => {
                if (element.proprietaire != req.auth.userId) {
                    res.status(401).json({message: "action non autorisé"});
                }else{
                    immobilier.deleteOne(id).then(() => {
                        // suppression de l'image
                        const immoImage = element.imageUrl.split('/images/')[1];
                        fs.unlink(`./images/${immoImage}`, () => console.log("fichier supprimé egalement"));
                        res.status(200).json({message: "immobilier trouvé et supprimé avec success"});
                        console.log("objet supprimé : " + element);
                    }).catch((error) => {
                        res.status(400).json({message: "probleme de suppression"});
                        console.log("objet non supprimé : " + error);
                    })
                }
              })
             .catch((error) => {
                res.status(404).json({message: "immobilier non trouvé"});
                console.log("objet non supprimé :" + error);
            });
}