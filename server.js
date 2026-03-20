import express from 'express';
import { connect } from './database/connect.js';
import { matchExtension } from './database/matchExtension.js';

const app = express();

//to be abole to use json in the request
app.use(express.json({limit : '10mb'}));

let conn;

//connect to database
(async () => {
    conn = await connect();
})();

//allow the extension to access this server
app.use((req, res, next) => {
  const allowedOrigin = "chrome-extension://lgihefilpndndbkhjlnahoollbkapbin";

  const origin = req.headers.origin;

  if (origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Private-Network", "true");
  }

  next();
});

//reflight request for cors this will be send before the actual request to check availabilty
app.options('/match', (req, res) => res.sendStatus(204));

//receive DOM and return matching extension
app.post('/match', async (req, res) => {
    try {
        console.log('Request received');
        
        //extract dom from the request body send it to the function 
        const { dom } = req.body;   
        const matches = await matchExtension(conn, dom);
       
        res.json(matches);
        console.log("Matching Completed");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Matching failed' });
    }
});

//Start server
app.listen(3000, () => {
    console.log("Server running");
});