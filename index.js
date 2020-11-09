const express = require('express');
const cors = require('cors');
const routes = require('./routes');


let app = express(),
   server;

/** Use Cors */
app.use(cors());

/** Initial Routes */
routes(app);

/** Initial Server */
server = app.listen(3000, () => {
   console.log(`IP Geolocation Service v0.1 listening on port ${3000}`);
});

/** Safely terminate the server and release the resources. */
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
   process.on(sig, () => {
      /** Stops the server from accepting new connections and finishes existing connections. */
      server.close((err) => {
         if (err) {
            console.error('Terminating Err:', err.message);
         }
         process.exit(err ? 1 : 0);
      })
   })
})