module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.BAKE_GITHUB_CLIENT_ID,
    clientSecret: process.env.BAKE_GITHUB_CLIENT_SECRET,
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&scope=${this.scope}`;
    }
    // faceook:{
    //   loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    //   accessTokenURL: '#',
    //   profileURL: '#',
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   scope: 'user:email',
    //   getLoginURL() {
    //     return `${this.loginURL}?client_id=${this.clientId}&redirect_uri={https://www.facebook.com/connect/login_success.html.}`
    // }
  }
};

// https://www.facebook.com/v2.8/dialog/oauth?
//   client_id={app-id}
//   &redirect_uri={redirect-uri}
