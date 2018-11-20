const express = require('express');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.set('views', 'views');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('sign-in.ejs', { title: 'Admission Trends' });
});
app.get('/add-entry', (req, res) => {
  res.render('add-entry.ejs');
});
app.get('/update-entry', (req, res) => {
  res.render('update-entry.ejs');
});
app.get('/index', (req, res) => {
  res.render('dashboard.ejs');
});
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
