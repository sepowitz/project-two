var express = require('express'),
		router = express.Router(),
		User = require('../models/users.js'),
		Post = require('../models/posts.js');


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
			res.redirect(301, "users/login")
		}

	});
});

//User login

router.get('/login', function(req, res){
	res.render('users/login');
});


router.post('/login', function(req, res){
	var attempt = req.body.user;

	User.findOne({username: attempt.username }, function(err, user){
		if(user && user.password === attempt.password){
			req.session.currentUser = user;
			res.redirect(301, "/")
		} else {
			res.redirect(301, "users/login")
		}
	});
});

router.get('/logout', function(req, res){
	console.log(req.session.currentUser)
	if(req.session.currentUser != null) {
		req.session.currentUser.username = null;
		req.session.currentUser.password = null;
		console.log(req.session.currentUser);
		res.render("users/login");
	}
});


router.get('/:userName/posts', function(req, res){
	if(req.params.userName === req.session.currentUser.username){
		Post.find({author: req.params.userName}, function(err, currentUserPosts){
			if(err){
				console.log(err);
			} else {
				console.log(currentUserPosts);
				res.render('users/show', {
					currentUser: req.session.currentUser,
					posts:currentUserPosts
				})
			}
		})
	} else {
		Post.find({author: req.params.userName}, function(err, userPosts){
			if(err){
				console.log(err);
			} else {
				res.render('users/index', {
					currentUser: req.session.currentUser,
					posts: userPosts,
					author: req.params.userName
				})
			}
		})
	}
});


//Export router object
module.exports = router;