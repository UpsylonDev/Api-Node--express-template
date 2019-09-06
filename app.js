require("babel-register");
var morgan = require("morgan");
const express = require("express");
const members = require("./assets/Members");

const app = express();

// le smidlewares

app.use(morgan("dev"))
var error = 'error'

//EXPRESS get
app.get("/api/v1/members/:id", (req, res) => {
  res.send(members[req.params.id - 1].name);
});

// requete parametrée
app.get('/api/v1/members', (req, res) => {
    if (req.query.max != undefined &&  req.query.max > 0) {
        res.send(members.slice(0, req.query.max))
    } else { 
        res.send('Selectionnez au moins un membre max')
    }
 });

app.listen(8080, () => {
  // possible de mettre un callback
  console.log("Start on port : 8080");
});
