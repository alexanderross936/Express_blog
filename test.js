const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

BlogPost.create({
    title: 'The Mythbusters Guide to saving energy bills',
    body: 'Blah blah blah'
}, (error, blogpost) => {
    console.log(error, blogpost)
})