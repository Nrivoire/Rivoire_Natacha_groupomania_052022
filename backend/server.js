const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

const config = require('./app/config.js');
const auth = require('./app/middelware/auth.js');
const multer = require('./app/middelware/multer-config.js');
const userController = require('./app/controllers/userController.js');
const postController = require('./app/controllers/postController.js');

app.use(bodyParser.json({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/signup', userController.createUser);
app.post('/api/login', userController.login);

app.get('/api/user/get', auth, userController.getUser);
app.put('/api/user/update', auth, userController.updateUser);
app.delete('/api/user/delete', auth, userController.deleteUser);

app.get('/api/post', auth, postController.getAllPosts);
app.post('/api/post/create', auth, multer, postController.createPost);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(config.port);