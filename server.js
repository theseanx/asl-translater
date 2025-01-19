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

    /// pass string as arg parse to the python file
    exec(`/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 translation.py`, (error, stdout, stderr) => {
        // this file is in the backend and it's running a terminal command (that's why you can run it in the terminal below)
        // in practice, you would make your own route and deploy that separally
        // from this server, you'd call that new server.
    // exec(`python3 -c "from sign_language_translator import Translator; print(Translator().translate('${working_string}'))"`, (error, stdout, stderr) => {
    // exec(`python -c "print('hello test')"`, (error, stdout, stderr) => {
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