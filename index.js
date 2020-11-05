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

/** Error: Not Found (404) */
app.use((req, res) => {
   res.json({
      success: false,
      error: '404, Invalid reuested.'
   });
});

/** Global Error Handler */
app.use((err, req, res, next) => {
   res.json({
      success: false,
      error: '500, Internal error.'
   });
   console.error('*** Server Error Log  ***', err);
});

app.listen(3000, () => {
   console.log(`IP Geolocation Service v0.1 listening on port ${3000}`);
});