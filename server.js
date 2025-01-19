// server.js
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/translate', (req, res) => {
    const text1 = req.body;
    const text = req.body.text;
    const working = req.body.textData;
    console.log("success!!!");
    console.log("text1: " + JSON.stringify(text1, null, 2));
    console.log("text:" + text);
    console.log("working:" + JSON.stringify(working, null, 2));
    const working_string = JSON.stringify(working, null, 2);
    console.log("working_string:" + working_string);
    // if (!working_text) {
    //     return res.status(400).send('Text is required');
    // }

    // exec(`python3 -c "from sign_language_translator import Translator; print(Translator().translate('${working_string}'))"`, (error, stdout, stderr) => {
    exec(`python3 -c "print('hello test')"`, (error, stdout, stderr) => {
        if (error) {
            console.log("received an error");
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error translating text');
        }
        console.log("did not receive an error");
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});