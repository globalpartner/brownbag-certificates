const bodyParser      = require('body-parser');
const config          = require('config-yml');
const cookieParser    = require('cookie-parser');
const csrf            = require('csurf');
const express         = require('express');
const expressPDF      = require('express-pdf');
const mustacheExpress = require('mustache-express');
const mongoose        = require('mongoose');

const routes = require('./routes/index');
const devRoutes = require('./routes/dev');

// Setup app
const app  = express();
const port = process.env.PORT || 3000;

// do not forget the database url!
// FIXME: change this to use the config file
const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb://localhost:27017/certificates';
mongoose.connect(DATABASE_URL, { useMongoClient: true });
mongoose.Promise = global.Promise; // this way we can use the promise support of mongoose

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(expressPDF);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/assets'));

app.use(csrf({ cookie: true }))
// Generate token for all get requests
app.get('*', function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/", routes);
app.use("/dev", devRoutes);

// Handle CSRF token errors
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  var args     = config.site;
  args.event   = config.event;
  args.message = config.errors.csrfError;

  res.sendStatus(403);
  res.render('error', args);
});

// Handle 500
app.use(function (err, req, res) {
  var args     = config.site;
  args.event   = config.event;
  args.message = config.errors.error500;

  res.sendStatus(500);
  res.render('error', args);
});

// Handle 404
app.use(function (req, res) {
  var args     = config.site;
  args.event   = config.event;
  args.message = config.errors.error404;

  res.sendStatus(400);
  res.render('error', args);
});

app.listen(port, function () {
  console.log(`Application is up and listen on port ${port}`);
});
