
//Server setup
var express 				= require('express'),
		PORT 						= process.env.PORT || 3000,
		server 					= express(),
		MONGOURI 				= process.env.MONGOLAB_URI || "mongodb://localhost:27017",
		dbname 					= "topica",
		mongoose 				= require('mongoose');

//Core dependencies
var bodyParser 			= require('body-parser'),
		ejs							= require('ejs'),
		expressLayouts	= require('express-ejs-layouts'),
		methodOverride	= require('method-override'),
		morgan					= require('morgan'),
		session					= require('express-session');	
		

//Set view engine
server.set('views', './views');
server.set('view engine', 'ejs');

//Connect MongoDB database
mongoose.connect(MONGOURI + '/' + dbname);

//Set up user login and authentication
server.use(session({
	secret: "bitchbetterhavemymoney",
	resave: true,
	saveUninitialized: false
}));

//Set up public route
server.use(express.static('./public'));

//Set up logger -- dev mode
server.use(morgan('dev'));

//Set up form data retrieval
server.use(bodyParser.urlencoded({
	extended: true
}));

//Set up RESTful route methods
server.use(methodOverride('_method'));

//Set up templating engine master layout
server.use(expressLayouts);




//Controller delegation

var userController = require('./controllers/user_controller.js');
server.use('/users', userController);

var topicController = require('./controllers/topic_controller.js');
server.use('/', topicController);


	
	server.listen(PORT, function(){
		console.log('Server is up on port', PORT);
	});