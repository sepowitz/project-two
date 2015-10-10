
//Server setup
var express 				= require('express'),
		PORT 						= process.env.PORT || 3000,
		server 					= express(),
		MONGOURI 				= process.env.MONGOLAB_URI || "mongodb://localhost:27017",
		dbname 					= "relevant_db_name",
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

//Setup public route
server.use(express.static('./public'));

//Setup logger -- dev mode
server.use(morgan('dev'));

//Setup form data retrieval
server.use(bodyParser.urlencoded({extended: true}));

//Setup RESTful route methods
server.use(methodOverride('_method'));

//Setup templating engine master layout
server.use(expressLayouts);


// //------------------ THIS IS JUST A TEST -----------------------//
// 	server.get('/this-is-just-a-secret/', function(req, res){
// 		res.write("Welcome, friend!");
// 		res.end();
// 	});
// //-------------------------------------------------------------//


//Include controllers here

var userController = require('./controllers/user_controller.js');
server.use('/users', userController);



	
	server.listen(PORT, function(){
		console.log('Server is up on port', PORT);
	});