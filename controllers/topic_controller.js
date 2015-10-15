var express = require('express'),
		router = express.Router(),
		Topic = require('../models/topics.js'),
		Post = require('../models/posts.js');




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
router.get('/:topicId/new_post', function(req, res){
	Topic.findById(req.params.topicId, function(err, articleTopic){
		if(err){
			console.log('there was an error retrieving topic to add article to' + err)
		} else {
				res.render('topics/new_post', {
				currentUser: req.session.currentUser,
				topic: articleTopic
			});
		}
	});
});


/*SHOW*/

//Show topic and related posts
router.get('/:topicId', function(req, res){
	Topic.findById(req.params.topicId, function(err, currentTopic){
		if(err){
			console.log(err);
		} else {
			Topic.findById(req.params.topicId).populate({path: 'posts', options: {sort: {'rank': -1}}}).exec(function(err, post){
				if(err){
					console.log(err);
				} else {
					console.log(post);
					res.render('topics/show', {
						currentUser: req.session.currentUser,
						topic: post
					})
				}
			})
		}
	})
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
router.post('/:topicId/post', function(req, res){
	req.body.post.author = req.session.currentUser.username;

	var newPost = Post(req.body.post);

	newPost.save(function(err, postAdded){
		if(err){
			console.log('Trouble adding new post to topic' + err)
		} else {
			Topic.findById(req.params.topicId, function(err, topicToPostTo){
				if(err){
					console.log(err);
				} else {
					topicToPostTo.posts.push(postAdded);
					topicToPostTo.save(function(err, updatedPost){
						if(err){
							console.log(err);
						} else {
							res.redirect(302, '/' + req.params.topicId);
						}
					})
				}
			})	
		}
	})
});


/* EDIT */

//Edit post form
router.get('/:postId/edit', function(req, res){
	Post.findById(req.params.postId,function(err, postToEdit){
		if(err){
			console.log('Trouble finding post to edit ' + err);
		} else {
			res.render('topics/edit_post', {
				post: postToEdit,
				currentUser: req.session.currentUser
			})
		}
	})
});

//Edit post

router.patch('/:postId/edit', function(req, res){
	var updatedTitle = req.body.post.title,
			updatedContent = req.body.post.content;
	Post.findByIdAndUpdate(req.params.postId, { title: updatedTitle, content: updatedContent }, function(err, postUpdated){
		if(err){
			console.log('Trouble editing post ' + err);
		} else {
			res.redirect(302, '/users/' + postUpdated.author + '/posts');
		}
	})
});




/* DESTROY*/


//Remove post
router.delete('/:postId/delete', function(req, res){
	var deletePost = req.params.postId;
	Post.findByIdAndRemove(req.params.postId, function(err, deletedPost){
		if(err){
			console.log('Trouble deleting post ' + err);
		} else {
			Topic.update({}, {$pull: {'posts': {$in: [req.params.postId]}}}, function(err, deletePostFromTopic){
				if(err){
					console.log(err);
				} else {
					res.redirect(302, '/users/' + req.session.currentUser.username + '/posts');
				}
			})
		}
	})
});

/* VOTING */

//Upvote

router.patch('/:topicId/post/:postId/upvote', function(req, res){
	var upValue = 1;
	Post.findByIdAndUpdate(req.params.postId, {$inc: {rank: upValue}}, function(err, upVotedPost){
		if(err){
			console.log(err);
		} else {
			res.redirect(302, '/' + req.params.topicId);
		}
	})
});

//Downvote

router.patch('/:topicId/post/:postId/downvote', function(req, res){
	var downValue = -1;
	Post.findByIdAndUpdate(req.params.postId, {$inc: {rank: downValue}}, function(err, downVotedPost){
		if(err){
			console.log(err);
		} else {
			res.redirect(302, '/' + req.params.topicId);
		}
	})
});

//Export router object
module.exports = router;