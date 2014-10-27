var currentEnv = process.env.ENV || 'development';

exports.env = {
    production: false,
    SIT: false,
    development: false
};
exports.env[currentEnv] = true;
exports.server = {
    ip: "127.0.0.1",
    port: "9000",
    mongodb_connection: "mongodb://localhost:27017"
};
if (currentEnv == 'development' || currentEnv != 'production') {
    exports.server.ip = "0.0.0.0";
    exports.server.port = "8000";
    exports.server.mongodb_connection = "mongodb://localhost:27017";
}