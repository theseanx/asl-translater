const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/data', express.static(path.join(__dirname, 'data'))); // Serve ASL images from the data folder

app.post('/translate', (req, res) => {
    // const text = req.body.text; // Extract the input text from the request body
    const input = req.body.textData;
    const text = JSON.stringify(input, null, 2);
    console.log("working_string:" + text);
    if (!text) {
        return res.status(400).send('Text is required');
    }

    // Generate HTML for the ASL images
    let imageHTML = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase(); // Convert to lowercase to match filenames
        if (char >= 'a' && char <= 'z') { // Check if it's a valid alphabet character
            const imagePath = `/data/${char}.png`; // Image path for the character
            imageHTML += `<img src="${imagePath}" alt="${char}" style="margin: 5px;">`;
        }
    }

    // Return the HTML string as the response
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
