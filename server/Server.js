// 
// Setup 
// 
var AuthPort = require('authport')
var MakerpassService = require('authport-makerpass')

// if (! process.env.MAKERPASS_CLIENT_ID || ! process.env.MAKERPASS_CLIENT_SECRET) {
//   throw new Error("Please set MAKERPASS_CLIENT_ID and MAKERPASS_CLIENT_SECRET")
// }
 
AuthPort.registerService('makerpass', MakerpassService)
 
AuthPort.createServer({
  service: 'makerpass',
  id: process.env.MAKERPASS_CLIENT_ID || 'd125322e59940ae2554e017b1bde13259f187bfd2e58c7dc24eed0ec52d980cf',
  secret: process.env.MAKERPASS_CLIENT_SECRET || '6a2324fd5414ab9f68bf8cad62a4e387090b03c8393b5c6e022ece6357bbc06b',
  callbackURL: process.env.HOST + '/auth/makerpass',
})
 
AuthPort.on('auth', function(req, res, data) {
  console.log("OAuth success!", data);
  req.session.accessToken = data.token
  req.session.uid = data.data.user.uid
  res.redirect('/')
})
 
AuthPort.on('error', function(req, res, data) {
  console.log("OAuth failed.", data)
  res.status(500).send({ error: 'oauth_failed' })
})
 
 
// 
// Adding to your express app 
// 
var express = require('express')
var session = require('express-session')
var app = express()
var MP = require('node-makerpass');
var path = require('path');


app.use(session({secret: "funnyGilby"}));
app.use(express.static(path.join(__dirname, '../client'))); 
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, '../bower_components')));
app.get("/auth/:service", AuthPort.app);

app.get("/myGroups", function(req, res){
  MP.user.groups(req.session.uid, req.session.accessToken)
  .then(function(data){
    console.log("Makerpass groups data: ", data);
    res.send(data);
  })
})

app.get("/groups/:nameId", function(req, res){
  MP.group(req.params.nameId, req.session.accessToken)
  .then(function(data){
    console.log("Data for this group: ", data);
    res.send(data);
  })
})

app.get("/groups/:nameId/memberships", function(req, res){
  MP.memberships(req.params.nameId, req.session.accessToken)
  .then(function(data){
    console.log("Data for members: ", data);
    res.send(data);
  })
})

 
app.listen(4000)
console.log('listening on port 4000 ')