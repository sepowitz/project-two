var express = require('express'),
		router = express.Router(),
		Topic = require('../models/topics.js');




/*INDEX*/ 

//Show all topics
router.get('/', function (req, res){
	Topic.find({}, function(err, topic){
		if(err){
			console.log('There was a problem finding topics' + err)
		} else {
			res.render('topics/index', {
			topic: topic,
			currentUser: req.session.currentUser
		});
	}
})
});

/* NEW */

//Add new topic
router.get('/new', function(req, res){
	res.render('topics/new', {
		currentUser: req.session.currentUser
	});
});

//Add new post
router.get('/:topicId/new_post')


/*SHOW*/

//Show topic and related posts
router.get('/:topicId', function(req, res){

});



/* CREATE */

//Create new topic
router.post('/', function(req, res){
	var newTopic = Topic(req.body.topic);

	newTopic.save(function(err, newTopicAdded){
		if(err){
			console.log('Trouble adding new topic' + err);
		} else {
			res.redirect(302, "/")
		}
	});
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




/* DESTROY*/

//Remove topic 
router.delete('/:topicId', function(req, res){

});

//Remove post
router.delete('/:topicId/post/:postId', function(req, res){


});


//Export router object
module.exports = router;