const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/mongodb-key');
//const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');



const app = express();

app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.set('views', 'views');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('sign-in.ejs', { title: 'Admission Trends' });
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


//app.use('/', routes);

app.use(adminRoutes);
app.use(dashboardRoutes);


app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});











//app.use('/', routes);


mongoose
  .connect(
    key.mongodbUrl || 'mongodb://localhost:27017/AdmissionTrends',
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log('MongoDB client connected');
    app.listen(7000, () => console.log('server is up on port 7000'));
  })
  .catch(err => console.log(err));