// MONGOOSE TEMPLATE MODELS
var mongoose = require('mongoose');

// rendre possible l'utilisation des schemas
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

// definiton des shemas 
const UserTestSchema = new mongoose.Schema({
    

});



// regrouper le tout dans un model 'myUsers' est le nom de la collection
const myUsers = mongoose.model('myUsers', UserTestSchema);

module.exports = { myUsers }