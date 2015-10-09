var express = require('express'),
		PORT = process.env.PORT || 3000,
		server = express();













	server.get('/', function(req, res){
		res.write("Welcome, friend!");
		res.end();
	});


	server.listen(PORT, function(){
		console.log('Server is up on port', PORT);
	});