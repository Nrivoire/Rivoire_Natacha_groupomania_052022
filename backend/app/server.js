const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const config = require('./config.js');
const auth = require('./middelware/auth.js');
const userController = require('./controllers/userController.js');
const postController = require('./controllers/postController.js');

app.use(bodyParser.json({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/signup', userController.createUser);
app.post('/api/login', userController.getUser);
app.put('/api/user/update', auth, userController.updateUser);
app.delete('/api/user/delete', auth, userController.deleteUser);

app.post('/api/post/create', postController.createPost);

app.listen(config.port);