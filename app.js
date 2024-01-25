const express = require('express');
const axios = require('axios'); // For making HTTP requests
const { Readability } = require('readability');
const { JSDOM } = require('jsdom');
require('dotenv').config();

// Set API_KEY from Environment Variable
const apiKey = process.env.API_KEY;


const app = express();
const port = 3000; // This should match the EXPOSED port in your Dockerfile

app.use(express.json());
// Middleware to check and parse the Authorization header
function checkAuthorizationHeader(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const [prefix, token] = authHeader.split(' ');

  if (prefix.toLowerCase() !== 'bearer') {
    return res.status(401).json({ error: 'Invalid authorization prefix' });
  }

  // Attach the token to the request for use in route handlers
  req.token = token;

  // Continue to the next middleware or route handler
  next();
}

app.use('/parse-url', checkAuthorizationHeader);
app.post('/parse-url', async (req, res) => {
  // Check if the API key is valid
  if (req.token != apiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
  }

  const url = req.body.url; // Send the URL as a JSON object

  try {
    // Fetch the HTML content from the provided URL
    const response = await axios.get(url);
    const rawHTML = response.data;

    const doc = new JSDOM(rawHTML, { url: url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    // Return the parsed article as a response
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch and parse the URL.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
