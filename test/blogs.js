process.env.NODE_ENV = 'test';

/* global , beforeEach, describe, expect, it */

const should = require('chai').should();
const expect = require('chai').expect;
const server = require('../server');
const app = require('supertest')(server);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach((done) => {
  Blog.collection.drop();
  User.collection.drop();


  User.create([{
    username: 'Emily',
    password: 'password',
    passwordConfirmation: 'password'
  }], (err, users) => {
    if(err) console.log(err);
    Blog.create([{
      dish: 'Tomato Soup',
      image: 'https://img.thewhiskyexchange.com/900/gin_sip1.jpg',
      description: 'straight out of the can',
      tag: 'Soup',
      createdBy: users[0]
    }, {
      dish: 'Victoria Sponge',
      image: 'https://img.thewhiskyexchange.com/900/gin_sip1.jpg',
      description: 'With lots of jam and cream',
      tag: 'cake',
      createdBy: users[0]
    }], done);
  });
});

//Checking for the Index route
describe('GET /blogs', () => {
  it('should return a 200 reponse', (done) => {
    app.get('/blogs')
    .expect(200, done);
  });

  it('should dislay all the blogs', (done) => {
    app.get('/blogs')
      .end((err, res) => {
        Blog.forEach((record) => {
          expect(res.text).to.contain(`src="${record.imageSRC}"`);
          expect(res.text).to.contain(`<h2>${record.dish}</h2>`);
          expect(res.text).to.contain(`<p>${record.username}</p>`);
        });
        done();
      });
  });
});
//-------------------------------------------
