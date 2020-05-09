var express = require('express');
var app = express();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
app.use(express.static('statics', options))


// route de base 
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('listening on *:3000 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
});