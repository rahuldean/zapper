var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(config.server.mongodb_connection);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load models
var common = require('./model/common.js');

for (var i in config.env) {
    var val =  config.env[i];
    if (val) {
      console.log("Environment " + i);
      break;
    }
}

app.get('/', function(req,res){
    console.log(req.ip);
    var resp = new common.Response();
    resp.message = "accepted";
    res.json(resp);
});

app.get('/Register', function(req,res){
    console.log(req.ip);
    var resp = new common.Response();
    resp.message = req.query.id + " " + req.query.s + " " + req.query.a;
    res.json(resp);
});

app.post('/Register', function(req,res){
    console.log('request =' + JSON.stringify(req.body))
    
    var regRequest = common.RegisterRequest();
    var resp = new common.Response();
    
    if (typeof req.body.id != 'undefined' && typeof req.body.s != 'undefined' && typeof req.body.a != 'undefined') {
        resp.message = "done";
        res.json(resp);
    }
    else
        res.status(400);
        
});
app.listen(config.server.port);
console.log('Listening on ' + config.server.port);