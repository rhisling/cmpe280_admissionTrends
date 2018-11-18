const express = require('express');

const app = express();

app.set('view-engine', 'ejs');
app.set('views', 'views');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index.ejs', { date: new Date() });
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
