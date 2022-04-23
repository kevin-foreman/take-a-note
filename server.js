// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
// On launch of this server file, the page can be viewed by visiting localhost:3001
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./data/db');
const { v4: uuidv4 } = require('uuid');



// Some express black magic middleware here...
// the first method is built into express.js, takes incoming POST data and converts to key/value pairs
// the 'extended: true' tells express there may be sub-array nested data, so look as deep as you can to parse everything correctly
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);


app.get('/api/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './data/db.json'));


});

function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);

    fs.writeFileSync(

        path.join(__dirname, './data/db.json'),

        // method to format the new data, null means we don't want to change existing data, the 2 creates white space between what exists, and what we add to make the code more readable
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // console.log(body);

    return note;

}

// simple data check validation basically meant to ensure a user does not add a blank note, or a note with a title with no text and vice versa
function validateNote(note) {

    if (!note.title || typeof note.title !== 'string') {

        return false;
    }

    if (!note.text || typeof note.text !== 'string') {

        return false;
    }

    return true;
}

app.post('/api/notes', (req, res) => {

    if (!validateNote(req.body)) {

        res.status(400).send('The note is not properly formatted.');

    } else {   
    
    // Add not to existing json file
    const note = createNewNote(req.body, notes);
    const noteId = uuidv4();
    note.id = noteId;

    res.json(note);
    }
});



app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));

});


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application at work`)
})

