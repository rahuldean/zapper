/* Holds all the models that are common for the application */

/* Define how the response will look like */
var Response = function(){
    this.message = "";
}

/* Define the request model for the Register call */
var RegisterRequest = function(){
    // device id
    this.ID = "";
    //device secret
    this.secret = "";
    //user alias
    this.alias = "";
};

/* exports */
module.exports = {
    Response: Response,
    RegisterRequest: RegisterRequest
};