const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Blog = require('../models/blog');

User.collection.drop();
Blog.collection.drop();

User
  .create([{
    username: 'tom',
    email: 't@t',
    password: 'p',
    passwordConfirmation: 'p'
  },{
    username: 'hannah',
    email: 'hannah@mail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Blog
      .create([{
        username: 'hannah',
        dish: 'Apple Pie',
        image: '../public/css/images/japan.jpg',
        description: 'homemade apple very tasty',
        recipie: 'apples go in pastry',
        tag: 'apple'
        // createdBy: 'hannah'
      },{
        username: 'hannah',
        dish: 'Chocolate brownie',
        image: '../public/css/images/japan.jpg',
        description: 'great with orange zest too',
        recipie: 'apples go in pastry',
        tag: 'chocolate'
        // createdBy: 'hannah'
      },{
        username: 'tom',
        dish: 'Cheese Burger',
        image: '../public/css/images/japan.jpg',
        description: 'quick easy to make',
        recipie: 'beef burger, bun, cheese nom!',
        tag: 'beef'
        // createdBy: 'tom'
      }]);
  })
  .then((blogs) => {
    console.log(`${blogs.length} blogs created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
