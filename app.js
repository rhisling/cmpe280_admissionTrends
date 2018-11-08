const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to admission Trends');
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
