var currentEnv  = process.env.ENV || 'development';
var mongoUser   = process.env.MongoUser || '';
var mongoPass   = process.env.MongoPass || '';

exports.env = {
    production: false,
    SIT: false,
    development: false
};
exports.env[currentEnv] = true;
exports.server = {
    ip: '127.0.0.1',
    port: '9000',
    mongo: {
        host: '',
        db: '',
        port: '',
        user: '',
        pass: ''
    }
};
if (currentEnv == 'development') {
    exports.server.ip           = '0.0.0.0';
    exports.server.port         = '8000';
    exports.server.mongo.host   = 'ds047940.mongolab.com';
    exports.server.mongo.db     = 'main';
    exports.server.mongo.port   = '47940';
    exports.server.mongo.user   = mongoUser;
    exports.server.mongo.pass   = mongoPass;
}