const express = require('express')
const app = new express()
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const validateMiddleware = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const BlogPost = require('./models/BlogPost.js')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const bodyParser = require('body-parser')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

global.loggedIn = null;

app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
app.get('/posts/new', authMiddleware, newPostController)
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/', homeController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost;
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.post('/posts/store', (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=> {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
    })
    res.redirect('/')
    })

})
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async(req, res)=> {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})




app.get('/posts/new', newPostController)
app.get('/post:id', async(req, res)=> {
    const blogpost = await BlogPost.findById(req.params.id)
  //  res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  res.render('post', {
      blogpost
  })
})
