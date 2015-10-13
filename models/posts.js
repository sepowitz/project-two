var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

//This will populate in the Topic's posts array

var postSchema = new Schema({
	_topic: {type: String, ref: 'Topic'},
	author: {type: String, required: true},
	title: {type: String, required: true},
	content: {type: String, required: true },
	rank: {type: Number, default: 0}
},{collection:'posts', strict:true}); 


var Post = mongoose.model('Post', postSchema);

module.exports = Post;