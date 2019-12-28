const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted:{ /* can 'declare' */
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost