require("babel-register");
var morgan = require("morgan");
const express = require("express");
const members = require("./assets/Members")
const {success , errors} = require("./assets/fonctions")
const bodyParser = require("body-parser")

const app = express();

// les midlewares

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Récupérer un membre.
app.get('/api/v1/members/:id', (req, res) => {
    let choice = (req.params.id)-1
     let test = res.json(  ( success(members[choice].name ).result)  )
});

// requete parametrée
app.get('/api/v1/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.query.max)))
    } else if (req.query.max == undefined || req.query.max != undefined) {
        res.json(res.json(errors('mauvaise valeur')))
    } else {
        res.json(success(members))
    }
});

// NODE - EXPRESS - POST
app.post('/api/v1/members', (req, res) => {
    if (req.body.name) {
        // vérifierque le nom n'est pas déja pris
        let sameName = false
        // on boucle sur tous les names de members
        for (let i = 0; i < members.length; i++) {
            if (members[i].name === req.body.name) {
                // on indique que le nom est déjà pris
                sameName = true
                break
            }
        }
        if (sameName) {
            res.json(errors('le nom est déjà pris'))
        } else {
            //  si samename n'existe pas,on crée l'objet à ajouter
            let member = {
                id: members.length + 1,
                name: req.body.name
            }
            // on le push au tableau members
            members.push(member)
            // on envoie un sucesss
            res.json(success(member))
        }

    } else {
        res.json(errors('Valeur de nom pas valable'))
    }
})
app.listen(8080, () => {
    // possible de mettre un callback
    console.log("Start on port : 8080");
})