const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/data', express.static(path.join(__dirname, 'data'))); // Serve ASL images from the data folder

// Translation route
app.post('/translate', (req, res) => {
    const input = req.body.textData; // Extract input from the request body
    if (!input) {
        return res.status(400).send('Text is required');
    }

    // Generate HTML for the ASL images
    let imageHTML = '';
    for (let i = 0; i < input.length; i++) {
        const char = input[i].toLowerCase(); // Convert to lowercase to match filenames
        if (char >= 'a' && char <= 'z') { // Check if it's a valid alphabet character
            const imagePath = `/data/${char}.png`; // Image path for the character
            imageHTML += `<img src="${imagePath}" alt="${char}" style="margin: 5px;">`;
        }
    }




    // Send the response
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ASL Translation</title>
        </head>
        <body>
            <h1>ASL Translation</h1>
            <div>${imageHTML}</div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
