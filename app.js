const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');

const key = require('./config/mongodb-key');

const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const univRoutes = require('./routes/univRoutes');

const app = express();
const store = new MongoDBStore({
  uri: key.mongodbUrl,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

/**
 * Middlewares start
 */
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'bigcatfish',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  res.set(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );
  next();
});

app.use(passport.initialize());
app.use(passport.session());

/**
 * Middlewares end
 */
const port = process.env.PORT || 3000;

/* app.get('/admin', (req, res) => {
  res.render('admin.ejs'); //?
});
app.get('/admin/add-entry', (req, res) => {
  res.render('add-entry.ejs');
});
app.get('/admin/update-entry', (req, res) => {
  res.render('update-entry.ejs');
});
app.get('/admin/delete-entry', (req, res) => {
  res.render('delete-entry.ejs');
});
app.get('/admin/find-entry', (req, res) => {
  res.render('find-entry.ejs');
});

app.get('/getScorestats',(req, res) => {
    res.render('fetch-GpaStats.ejs');
});

*/

function isLoggedIn(req, res, next) {
  if (req.user) {
    console.log('Logged in User', req.user);
    next();
  } else {
    res.render('sign-in', {
      title: 'Admission Trends',
      message: 'Invalid session. Please login!'
    });
  }
}

app.use('/', routes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(userRoutes);
app.use(isLoggedIn, dashboardRoutes);
app.use(univRoutes);

mongoose
  .connect(
    key.mongodbUrl || 'mongodb://localhost:27017/AdmissionTrends',
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log('MongoDB client connected');
    app.listen(port, () => console.log('server is up on port', port));
  })
  .catch(err => console.log(err));
