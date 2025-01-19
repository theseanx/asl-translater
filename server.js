// server.js
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/translate', (req, res) => {
    const text = req.body.text;
    console.log("success!!!");
    console.log(text)

    if (!text) {
        return res.status(400).send('Text is required');
    }

    exec(`python3 -c "from sign_language_translator import Translator; print(Translator().translate('${text}'))"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error translating text');
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});