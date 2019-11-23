var express = require('express');
var router = express.Router();
var app=express();
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0-fwwel.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
});

router.get('/', function(req, res) {
db.collection("issues").find({}, function(err, result) {
    if (err)
		res.json(err);
    else
		res.json(result);
	});
	});

router.post('/addIssue', function(req, res) {
  var issue = {};
  issue._id=req.body._id;
  issue.description = req.body.description;
  issue.severity= req.body.severity;
  issue.status= req.body.status;
  issue.created= req.body.created;
  issue.resolved= req.body.resolved;
  db.collection("issues").create(issue, function (err, user) {
        if (err)
            res.send(err);
        else{
            res.json(user);
		}
    });
});


router.put('/editIssue/:_id', function(req, res) {
    db.collection("issues").findOneAndUpdate({ _id: req.params._id },
        { $set: { description : req.body.description,
		severity : req.body.severity, 
		status : req.body.status,
		created : req.body.created,
		resolved : req.body.resolved} 
		},
        {new: true}, 
        function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
});


router.delete('/deleteIssue/:_id', function(req, res) {
    db.collection("issues").findOneAndRemove({ _id: req.params._id }, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });
});

module.exports = router;