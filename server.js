//require out packages

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

//create an express app
const app = express();



//set up our template engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

//set up our static files folder.  whenever you get a request for wanything, first check whether its in the public folder.  if its in there, send it out, otherwise check for routes. (ie we dont ever need to write routes for files in the public folder.)
app.use(express.static(`${__dirname}/public`));

//hook up database with mongoose - a specific uri with a port, environment and session secret.
mongoose.connect(dbURI);

//set up our middleware
//check we have a body (ie body parser), and then checking that req body is an object (not string or number) and then checking whether method property is inside the req body object.  we then return that from this statmenet and tell method ovveride to delete the req.body_method.
if(env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;

    return method;
  }
}));

//set up our sessionSecret
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// set up flash messages AFTER sessions.  flash messages use the session to store the message in - so flahs couldn't get hold of the sessions data if it is before the sessions.
app.use(flash());


//both of these require flash, so we put them here.
app.use(customResponses);
app.use(authentication);

//set up our routes
app.use(routes);


//setup our error handler (always the last piece of middleware)
app.use(errorHandler);

app.listen(port, () => console.log(`Express always listens to port ${port}`));
