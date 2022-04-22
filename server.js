// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
// On launch of this server file, the page can be viewed by visiting localhost:3001
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./data/db');


// const { randomUUID } = require('crypto');
// testing for unique id for each note
// console.log(randomUUID());




// determine the path for the routes




// Some express black magic middleware here...
// the first method is built into express.js, takes incoming POST data and converst to key/value pairs
// the 'extended: true' tells express there may be sub-array nested data, so look as deep as you can to parse everything correctly
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());
// app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);




app.get('/api/notes', (req, res) => {

    res.json(notes);

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

app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();

    // Add not to existing json file
    const note = createNewNote(req.body, notes);

    res.json(note);
});


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application at work`)
})

