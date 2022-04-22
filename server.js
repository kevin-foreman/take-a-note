// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
// On launch of this server file, the page can be viewed by visiting localhost:3001
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
    console.log(body);

    return body;

}

app.post('/api/notes', (req, res) => {

    // req.body is where the input will be

    console.log(req.body);

    res.json(req.body);
});


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application at work`)
})

