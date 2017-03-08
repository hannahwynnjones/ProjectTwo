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
        dish: 'Apple Pie',
        image: '/assets/images/cake.jpg',
        description: 'homemade apple very tasty',
        tag: 'apple',

        createdBy: users[1]
      },{

        dish: 'Chocolate brownie',
        image: '../src/assets/images/cake.jpg',
        description: 'great with orange zest too',
        tag: 'chocolate',
        createdBy: users[1]
      },{

        dish: 'Cheese Burger',
        image: 'assets/images/cake.jpg',
        description: 'quick easy to make',
        tag: 'beef',
        createdBy: users[0]
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
