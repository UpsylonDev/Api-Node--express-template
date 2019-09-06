require("babel-register");
var morgan = require("morgan");
const express = require("express");
const members = require("./assets/Members")
const func = require("./assets/fonctions")

const app = express();

// les midlewares

app.use(morgan("dev"))
var error = 'error'

//EXPRESS get
// app.get("/api/v1/members/:id", (req, res) => {
//     res.json(success(members[req.params.id - 1].name))
// });

// requete parametrée
app.get('/api/v1/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(func.success(members.slice(0, req.query.max)))
    } else if(req.query.max == undefined || req.query.max != undefined) {
      res.json(res.json(func.errors('mauvaise valeur') ))
    }
    else {
      res.json(func.success(members))
    }
});

app.listen(8080, () => {
    // possible de mettre un callback
    console.log("Start on port : 8080");
});

