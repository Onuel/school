var mongoose = require('mongoose');





var CONN_DISCONNECTED = 0,
    CONN_DISCONNECTING = 3,
    CONN_CONNECTED = 1;




mongoose.Promise = require("bluebird");

var options = {
    useMongoClient: true,
    socketTimeoutMS : 0,
    keepAlive: true,
    reconnectTries: 30
};
// mongoose.connect('mongodb://localhost/school_info', options);
mongoose.connect('mongodb://school:school@ds249545.mlab.com:49545/schoolinfo', options);
db = mongoose.connection;
var openConnection = function(callback) {

    if (mongoose.connection === undefined ||
                    mongoose.connection.readyState === CONN_DISCONNECTED ||
                    mongoose.connection.readyState === CONN_DISCONNECTING) {
        
        mongoose.connection.on('connected', function() {

            console.log('Db connected');
            
            if (callback) {
                callback(true);
            }
        });

        mongoose.connection.on('error', function(e) {
            console.log('Db connection error');
            if (callback) {
                callback(e);
            }else {
                console.log(e);
            }
        });
        
        mongoose.connect(MONGOHQ_URI);
    }else {
        if (callback) {
            callback(true);
        }
    }
    
};

var closeConnection = function () {
    if (mongoose.connection && mongoose.connection.readyState === CONN_CONNECTED) {
        mongoose.disconnect();
        
        mongoose.connection.removeAllListeners('connected');
        
        mongoose.connection.removeAllListeners('error');
    }
};

/**
 * core database class exposing Mongoose object after making connection
 * @class Db
 * */
function Db(callback) {
    this.close = function() {
        closeConnection();
    };
    
    this.open = function(callback) {
        openConnection(callback);
        return mongoose;
    };
    
    //Let mongoose open and close the connection as we like.
    mongoose.open  = function(callback) {
        openConnection(callback);
        return mongoose;
    };
    
    mongoose.close = function() {
      closeConnection();  
    };
    
    openConnection(callback);
    
    return mongoose;
}

//Just export the function and do not initialize so that 
//I have to explicitly do that in order to be a able to plug a callback
module.exports = Db;


