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
mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0-fwwel.mongodb.net/issuetracker?retryWrites=true&w=majority");

var userSchema = new mongoose.Schema({
	_id:Number,
    description:String,
	severity:String,
	status:String,
	created:Date,
	resolved:Date,
});

var User = mongoose.model('issues', userSchema);

router.get('/', function(req, res) {
User.find({}, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
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
  User.create(issue, function (err, user) {
        if (err){
            res.send(err);
        } else{
            res.json(user);
		}
    });
});


router.put('/editIssue/:_id', function(req, res) {
    User.findOneAndUpdate({ _id: req.params._id },
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
    User.findOneAndRemove({ _id: req.params._id }, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });
});

module.exports = router;