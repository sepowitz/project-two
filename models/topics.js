var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


var topicSchema = new Schema({
	topic: {type: String, required: true},
	description: String,
	posts: [{type:Schema.Types.ObjectId, ref: 'Post'}],
}, {collection: 'topics', strict: true}); 


var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
