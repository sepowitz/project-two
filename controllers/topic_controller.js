var express = require('express'),
		router = express.Router(),
		Topic = require('../models/topics.js');




/*INDEX*/ 

//Show all topics
router.get('/', function(req, res){
	console.log(req.session);
	res.render('topics/index');
});




/*SHOW*/

//Show topic and related posts
router.get('/:id', function(req, res){

});



/* CREATE */

//Create new topic
router.post('/', function(req, res){

});

//Create new post
router.post('/:id/', function(req, res){

});



/* EDIT */

//Edit topic 
router.patch('/:id/edit', function(req, res){

});

//Edit post

router.patch('/:id/post/:id/edit', function(req, res){

});



/* NEW */

//Add new topic
router.get('/new', function(req, res){

});

//Add new post
router.get('/:id/new_post')



/* DESTROY*/

//Remove topic 
router.delete('/:id', function(req, res){

});

//Remove post
router.delete('/:id/post/:id', function(req, res){


});


//Export router object
module.exports = router;