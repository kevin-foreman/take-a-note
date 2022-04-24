// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
// On launch of this server file, the page can be viewed by visiting localhost:3001
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db');
const { v4: uuidv4 } = require('uuid');

// Some express black magic middleware here...
// the first method is built into express.js, takes incoming POST data and converts to key/value pairs
// the 'extended: true' tells express there may be sub-array nested data, so look as deep as you can to parse everything correctly
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());
app.use(express.static('public'));


// Get existing notes, if any, and present to the user on the html
app.get('/api/notes', (req, res) => {

    let results = notes;

    res.sendFile(path.join(__dirname, './db/db.json'));

});


// simple data check validation basically meant to ensure a user does not add a blank note, or a note with a title with no text and vice versa
function validateNote(note) {

    if (!note.title || typeof note.title !== 'string') {

        return false;
    }

    else if (!note.text || typeof note.text !== 'string') {

        return false;
    } else {

    return true;
    }
};

// assign a random id using uuid
// admittedly, the random id assigned using this npm pacakage assigns a REALLY long id...
// going through the documentation from UUID would probably yield a way to trim that id down
const noteId = uuidv4();

 // Add note to existing json file
app.post('/api/notes', (req, res) => {

    if (!validateNote(req.body)) {

        res.status(400).send('The note is not properly formatted.');

    } else {
    

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        const newNote = req.body;
        newNote.id = noteId;
        let newTask = JSON.parse(data);
        newTask.push(newNote);
        

    fs.writeFile('./db/db.json', JSON.stringify(newTask), (err) => {
        if (err) throw err;
    });

    });

        const newNote = req.body;
        newNote.id = noteId;

    res.json(notes);
    };
});

// Route to return the notes.html page
app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'));

});

// Route to return the index.html and use a boolean * so it returns the user to this page if they call for something that doesn't exist
app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));

});

// set up the local server to listen for the port
// Note: the port depends on the 
app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application at work`)
});