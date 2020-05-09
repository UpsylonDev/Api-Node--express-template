var express = require('express');
var app = express();
var path = require('path')
const webpush = require('web-push');

const publicVapidKey = 'BJcrAguT-qzScfaVCSJrJhgLpHGll48aiXjGyPIZrZtYplFjI2F56NFkAVC_qrph67A5qsrJQ8gl9bIjFVdmwa8';
const privateVapidKey = 'NCFV3ddvc7pQjEVNqSzmrxp8M8Q_t3JxYgzgXjEZ5pM';

//  pour les fichiers statiques
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html', 'js'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now())
//   }
// }

app.use(express.static( path.join(__dirname, "public" ) ))
app.use(require('body-parser').json());

// definit qui envoit la notification ( mettre le mail du site en prod )
webpush.setVapidDetails(
 "mailto:upsylon.dev@gmailo.com",publicVapidKey, privateVapidKey
);


// route d'instriction aux notifications 
app.post('/subscribe', (req, res)=>{
  // envoi de l'objet subscrition
  const subscription = req.body

  res.status(201).json({

  })

  const payload = JSON.stringify({
    title : "push test !!!"
  })

  webpush.sendNotification(subscription , payload).catch((err)=> console.log(err));

})











app.listen(3000, () => {
    console.log('listening on *:3000 >>>>>');
});