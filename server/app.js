const express = require('express');
const axios = require('axios')
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/similar', (req, res) => {
  axios.get('https://tastedive.com/api/similar', {
    params: {
      k:'407012-SofaMuse-4O5QIEKF',
      q: req.query.q,
      type: req.query.type,
      info: 1,

    }
  })
    .then((r) => {
      res.send(r.data).status(200);
    })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});