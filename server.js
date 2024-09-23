// This will be the node Express server that will serve up your app
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory 
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// New POST route to handle reaction time submission
app.post('/save-time', (req, res) => {
  const { reactionTime } = req.body;

  if (reactionTime) {
    console.log(`Received reaction time: ${reactionTime} ms`);

    // Send success response to the client
    res.json({ message: 'Reaction time saved successfully!' });
  } else {
    // If reactionTime is not provided in the request body
    res.status(400).json({ error: 'Reaction time not provided' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// these are some of the libraries you will need
