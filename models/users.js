var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

//This user model 
var userSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	posts: [{type: Schema.Types.ObjectId, ref: 'Topic' }],
}, {collection: 'users', strict: true}); 


var User = mongoose.model('User', userSchema);



module.exports = User;

