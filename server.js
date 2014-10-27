var express     = require('express');
var bodyParser  = require('body-parser');
var config      = require('./config');
var app         = express();
var mongoose    = require('mongoose');

mongoose.connect(config.server.mongo.host, 
    config.server.mongo.db, 
    config.server.mongo.port, 
    {
        user: config.server.mongo.user, 
        pass: config.server.mongo.pass
    });

var db = mongoose.connection;

// Successfull connection
db.on('connected', function(){
    console.log('[Mongoose]: connected \n ' + JSON.stringify(config.server.mongo));
});

// Connection error
db.on('error', function(err){
   console.log('[Mongoose]: Error connecting to mongodb \n' + err); 
});

// Disconnected
db.on('disconnected', function(){
    console.log('[Mongoose]: disconnected');
})

function exitHandler(options, err) {
    if (options.cleanup){
        dbConnectionCloser(function(err){
           if (!err) {
                console.log('cleaned');
            } 
        });
    } 
    if (err){
        dbConnectionCloser(function(err){
           if (!err) {
                console.log(err.stack);
            } 
        });
        
    } 
    if (options.exit){
         dbConnectionCloser(function(err){
           if (!err) {
                process.exit();
            } 
        });
        
    } 
}

function dbConnectionCloser(callback){
    db.close(function(){
            console.log('[Mongoose]: closing connection');
            callback(null);
        });
}
// when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

// ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

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