const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const key = require('./config/mongodb-key');

const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/userRoutes');
const app = express();
const store = new MongoDBStore({
  uri: key.mongodbUrl,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

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


app.get('/ucb', (req, res) => {
  res.render('ucb.ejs');
});
app.get('/uci', (req, res) => {
  res.render('uci.ejs');
});
app.get('/ucsd', (req, res) => {
  res.render('ucsd.ejs');
});
app.get('/ucla', (req, res) => {
  res.render('ucla.ejs');
});
app.get('/ucsb', (req, res) => {
  res.render('ucsb.ejs');
});
app.get('/ucr', (req, res) => {
  res.render('ucr.ejs');
}); */

app.use('/', routes);
app.use(adminRoutes);
app.use(dashboardRoutes);
app.use(userRoutes);
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
