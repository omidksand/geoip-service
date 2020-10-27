const express = require('express');
const cors = require('cors');
const MaxMind = require('./lib/maxmind');


const app = express();

app.use(cors());

app.get('/', (req, res) => {
   res.json({
      success: true,
      message: `IP Geolocation Service v0.1`
   });
});

app.get('/:ip', (req, res) => {
   let { ip = null } = req.params,
      result = ip ? MaxMind.findIpLocation(ip) : null;

   res.json(result || {
      success: false,
      message: 'Invalid IP address.'
   });
});

app.listen(3000, () => {
   console.log(`IP Geolocation Service v0.1 listening on port ${3000}`);
});