function route(app){
    
var student  = require("./student");
 student.route(app);

}

module.exports.route = route;
