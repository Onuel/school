var db = global.db;


// MONGOOSE MODEL CONFIGURATION
var Schema = db.Schema;
var studentSchema = new Schema(
    {

        firstname: {
            type: String,            
        },
        middlename: {
            type: String,        
        },
        lastname: {
            type: String,        
        },
        gender: {
            type: String,            
        },
        address: {
            type: String,            
        },
        email: {
            type: String,

        },
        phone_no: {
            type: Number,           
        },
        DOB: {
            type: String,            
        },
        state: {
            type: String,
            
        },
        LGA: {
            type: String,            
        },
        image: {
            type: String,
        },
        course: {
            type: String,    
        },
        created: {
            type: Date, default: Date.now
        }
    }
);


module.exports = mongoose.model('student', studentSchema);
