var express = require('express'),
		router = express.Router(),
		Topic = require('../models/topics.js');




/*INDEX*/ 

//Show all topics
router.get('/', function(req, res){
	console.log(req.session);
	res.render('topics/index', {
		currentUser: req.session.currentUser
	});
});




/*SHOW*/

//Show topic and related posts
router.get('/:topicId', function(req, res){

});



/* CREATE */

//Create new topic
router.post('/', function(req, res){

});

//Create new post
router.post('/:topicId/', function(req, res){

});



/* EDIT */

//Edit topic 
router.patch('/:topicId/edit', function(req, res){

});

//Edit post

router.patch('/:topicId/post/:postId/edit', function(req, res){

});



/* NEW */

//Add new topic
router.get('/new', function(req, res){

});

//Add new post
router.get('/:topicId/new_post')



/* DESTROY*/

//Remove topic 
router.delete('/:topicId', function(req, res){

});

//Remove post
router.delete('/:topicId/post/:postId', function(req, res){


});


//Export router object
module.exports = router;