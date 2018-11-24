const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/mongodb-key');
//const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/userRoutes');
var VerifyToken = require('./auth/VerifyToken');
const AuthController = require('./auth/AuthController');
const app = express();

app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.set('views', 'views');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


const port = process.env.PORT || 3000;

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});





/* JWT authentication*/


app.use('/api/auth',AuthController);


app.get('/', (req, res) => {
  res.render('sign-in.ejs', { title: 'Admission Trends' });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up.ejs', { title: 'Admission Trends' });
});



app.get('/admin', (req, res) => {
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




//app.use('/', routes);
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
    app.listen(port, () => console.log('server is up on port',port));
  })
  .catch(err => console.log(err));