// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
// On launch of this server file, the page can be viewed by visiting localhost:3001
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const { notes } = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');



// Some express black magic middleware here...
// the first method is built into express.js, takes incoming POST data and converts to key/value pairs
// the 'extended: true' tells express there may be sub-array nested data, so look as deep as you can to parse everything correctly
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {

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

    // Add note to existing json file
    // assign a random id using uuid
 
    const noteId = uuidv4();

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
        // const noteId = uuidv4();
        newNote.id = noteId;
        

    // fs.writeFileSync('./db/db.json', JSON.stringify({ newNote }, null, 2), err  => {

       //  if (err) throw err;

        // path.join(__dirname, './db/db.json'),

        // method to format the new data, null means we don't want to change existing data
        // The 2 creates white space between what exists, and what we add to make the code more readable
        // JSON.stringify({ newTask }, null, 2)

    res.json(res.body);
    // });
    };
});






app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));

});


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application at work`)
});