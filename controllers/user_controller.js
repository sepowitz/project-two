var express = require('express'),
		router = express.Router(),
		User = require('../models/users.js');



router.get('/new', function (req, res){
	res.render('users/new');
});

















module.exports = router;