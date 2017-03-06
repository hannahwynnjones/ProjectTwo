const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');


function facebook(req, res, next) {
  // return rp({
  //   method: 'POST',
  //   url: oauth.facebook.accessTokenURL,
  //   qs: {
  //     client_id: oauth.facebook.clientId,
  //     client_secret: oauth.facebook.clientSecret,
  //     code: req.query.code
  //   },
  //   json: true
  // })
  // .then((token) => {
  //   return rp({
  //     method: 'GET',
  //     url: oauth.facebook.profileURL,
  //     qs: token,
  //     json: true,
  //     headers: {
  //       'User-Agent': 'Request-Promise'
  //     }
  //   });
  // })
  .then((profile) => {
    return User.findOne({$or: [{email: profile.email }, { facebookId: profile.id}] })//first check their emails in case they already exist on our systm
      .then((user) => {
        if(!user) { ///if no user
          user = new User({
            username: profile.login,
            email: profile.email
          });
        }

        user.facebookId = profile.id;
        user.image = profile.avatar_url;
        return user.save();
      });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `welcome back ${user.username}!`);
    res.redirect('/');
  })
  .catch(next);
}

module.exports = {
  facebook
};

//post request to facebook, with url , then send a query string which contains the client id, secret and the code qhich we get from req.query.code, which will then mean that facebook will send us an access token.
