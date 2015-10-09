var express = require('express'),
		PORT = process.env.PORT || 3000,
		server = express(),
		MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
		dbname = "relevant_db_name",
		mongoose = require('mongoose');













	server.get('/this-is-just-a-secret/', function(req, res){
		res.write("Welcome, friend!");
		res.end();
	});



	mongoose.connect(MONGOURI + '/' + dbname);
	server.listen(PORT, function(){
		console.log('Server is up on port', PORT);
	});