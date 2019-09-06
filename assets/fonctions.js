// retourner le status des réponses
function success(result) {
    return {status: 'success', result: result}
}
function errors(message) {
    return {status: 'error', result: message}
}

module.exports = {success , errors}