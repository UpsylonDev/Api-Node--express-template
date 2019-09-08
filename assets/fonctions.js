const members = require('./Members')
// retourner le status des réponses
function success(result) {
    return {status: 'success', result: result}
}
function errors(message) {
    return {status: 'error', result: message}
}

// test de la valeur de l'id
// vérifier que l'ID dans un get 
// est bien un nombre (sécurité) en passant par la fonction getIndex

function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        // pas besoin de crochets dans les if si une seule instruction
        if (members[i].id  == id) {
            return i
        }
    }
    return "Mauvaise ID"
    
}
function createId() {
    // récupérer le dernier membre et ajouter un nouveau n°id 
    return lastMember = members[members.length -1].id + 1
    
}

module.exports = {success , errors, getIndex, createId}

