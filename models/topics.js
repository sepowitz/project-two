var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

//This is a sub-document that will live in the Topic's posts array

var postSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, required: true},
	content: {type: String, required: true }
}; 


var topicSchema = new Schema({
	topic {type: String, required: true},
	description: String,
	posts [postSchema],
}, {collection: 'topics', strict: true}); 


var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
