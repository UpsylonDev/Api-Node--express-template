require("babel-register");
var morgan = require("morgan");
const express = require("express");
const members = require("./assets/Members");
const { success, errors, getIndex, createId } = require("./assets/fonctions");
const bodyParser = require("body-parser");
const app = express();
let MembersRouter = express.Router();
const config = require("./assets/config");

// les midlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// définir l'Url de base
app.use(config.rootAPI + "members", MembersRouter);

MembersRouter.route("/:id")
  // = /api/v1/members/:id

  // reourne un seul membre par son id
  .get((req, res) => {
    // vérifier que l'ID est bien un nombre (sécurité) en passant par la fonction
    // getIndex
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(errors(index));
    } else {
      res.json(success(members[index]));
    }
  })
  // Mise à jour de données  id: PUT/ UPDATE: on change son nom via son iD
  .put((req, res) => {
    // Test de l'ID par get getindex
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(errors(index));
    } else {
      // tester si c'est le même nom = rien à changer
      let sameName = false;

      // vérifier que le nom n'est pas déjà pris

      for (let i = 0; i < members.length; i++) {
        // si même nom posté dans le body name est le même ... et si l'id n'est pas le
        // même que le membre actuellement selectionné : ce qui veut dire que deux
        // membres peuvent avoir le mème nom : seule les id sont différents
        if (
          req.body.name == members[i].name &&
          req.params.id != members[i].id
        ) {
          sameName = true;
          break;
        }
      }
      // si ne nom est bien différent on peut le changer
      if (sameName) {
        res.json(errors("Même nom"));
      } else {
        // sinon on change le nom
        members[index].name = req.body.name;
        // on revoie une réponse pour dire que tout c'est bien passé
        res.json(success("changent bien effectué"));
      }
      res.json(success(members[index]));
    }
  })

  // supprimer un membre par son id
  .delete((req, res) => {
    // on test si la personne existe
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(errors(index));
    } else {
      // utiliser splice()
      members.splice(index, 1);
      res.json(success(members));
    }
  });

MembersRouter.route("/") // veut dire qu'il n'y à rien après l'adresse  /members
  //  requete parametrée
  .get((req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
      res.json(success(members.slice(0, req.query.max)));
    } else if (req.query.max == undefined || req.query.max != undefined) {
      res.json(res.json(errors("mauvaise valeur")));
    } else {
      res.json(success(members));
    }
  })
  // NODE - EXPRESS - POST
  .post((req, res) => {
    if (req.body.name) {
      // vérifierque le nom n'est pas déja pris
      let sameName = false;
      // on boucle sur tous les names de members
      for (let i = 0; i < members.length; i++) {
        if (members[i].name === req.body.name) {
          // on indique que le nom est déjà pris
          sameName = true;
          break;
        }
      }
      if (sameName) {
        res.json(errors("le nom est déjà pris"));
      } else {
        // si samename n'existe pas,on crée l'objet à ajouter on crée un nouvel id avec
        // la fcontion create id
        let member = {
          id: createId(),
          name: req.body.name
        };
        // on le push au tableau members
        members.push(member);
        // on envoie un sucesss
        res.json(success(member));
      }
    } else {
      res.json(errors("Valeur de nom pas valable"));
    }
  });


  MembersRouter.route('')

// **********ne marche pas 
  //  Récupère tous les membres
  .get((req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
      res.json(success(members.slice(0, req.query.max)));
    } else if (req.query.max != undefined) {
      res.json(error("Wrong max value"));
    } else {
      res.json(success(members));
    }
  });








app.listen(config.port, () => console.log("Started on port " + config.port));
