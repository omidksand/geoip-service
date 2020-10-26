const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


app.get('/', (req, res) => {
   res.json({
      success: true,
      message: `IP Geolocation Service v0.1`
   });
});

app.listen(3000, () => {
   console.log(`IP Geolocation Service v0.1 listening on port ${3000}`);
});
