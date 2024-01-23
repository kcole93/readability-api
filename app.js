const express = require('express');
const axios = require('axios'); // For making HTTP requests
const { Readability } = require('readability');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3000; // This should match the EXPOSED port in your Dockerfile

app.use(express.json());

app.post('/parse-url', async (req, res) => {
  const url = req.body.url; // Assuming you send the URL as a JSON object

  try {
    // Fetch the HTML content from the provided URL
    const response = await axios.get(url);
    const rawHTML = response.data;

    const doc = new JSDOM(rawHTML, { url: url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch and parse the URL.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
