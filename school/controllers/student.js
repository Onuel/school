var student = require("../model/student/student-db.js");

function route(app) {

    // NEW ROUTE
    app.get('/', function (req, res) {
        res.render("new")
    })

    app.post("/studentAll", function(req, res){
        student.create(req.body.data, function(err, data){
            if (err) {
                res.render("new")
            } else {
                res.redirect("/studentAll");
            }
        })
    })


   // INDEX ROUTE
    app.get("/studentAll", function(req, res){
        student.find({}, function(err, data){
            if (err) {
                console.log("error!")
            } else {
                res.render("index", { data: data })
            }
        })
    })

    
   app.get("/student:id", function(req, res){
        student.findById(req.params.id, function(err, data){
            if (err) {
                res.redirect("studentAll")
             } else {

                res.render("show", { data: data })
            }
        })
    })


    app.get('/edit_student:id', function (req, res) {
        student.findById(req.params.id, function(err, data){
            if (err) {
                res.redirect("studentAll")
                
            } else {
                res.render("edit", { data: data })
            
            }
        })
    })

    // UPDATE ROUTE
    app.put("/student/:id", function(req, res){
        student.findByIdAndUpdate(req.params.id, req.body.data, function(err, data){
            if(err){
                res.redirect("/studentAll")
            }else{
                res.redirect("/student" + req.params.id)
            }
        })
    })

    // DELETE ROUTE
    app.delete("/student/:id", function(req, res){
       student.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/studentAll")
            }else{
                res.redirect("/studentAll")
            }
       })
    })
};

module.exports.route= route;
