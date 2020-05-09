var app = require('express')();

// route de base 
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
});


app.listen(3000, () => {
    console.log('listening on *:3000 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
});