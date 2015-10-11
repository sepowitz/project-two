var express = require('express'),
		router = express.Router(),
		User = require('../models/users.js');


/* NEW */

//New user signup form
router.get('/new', function (req, res){
	res.render('users/new');
});


/* CREATE */

//Add new user to database
router.post('/', function(req, res){
	var newUser = User(req.body.user);

	newUser.save(function(err, user){
		if(err){
			console.log('Trouble adding new user' + err);
		} else {
			res.redirect(301, "")
		}

	});
});

//User login

router.get('/login', function(req, res){
	res.render('users/login');
});


router.post('//This needs to match user login Action', function(req, res){
	var attempt = req.body.user;

	User.findOne({username: attempt.username }, function(err, user){
		if(user && user.password === attempt.password){
			req.session.currentUser = user.username;
			res.redirect(301, "/topics/")
		} else {

		}
	});
});















//Export router object
module.exports = router;