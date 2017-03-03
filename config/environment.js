//PORT will be stored in your zhrc file, so if its not there you'll go to the localhost:3000 instead.
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project-2-${env}`; //linking to the const env
const sessionSecret = process.env.SESSION_SECRET || 'another awesome secret';

module.exports = { port, env, dbURI, sessionSecret };
