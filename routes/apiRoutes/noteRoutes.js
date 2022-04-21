// const express = require('express');
// const app = express();

// // Write out the rest of the dependencies of the noteRoutes JS to allow the creation of new notes
// const { filterByQuery, createNewNote, } = require('../../lib/notes');
// const { notes } = require('../../data/db');

// app.post("/notes", (req, res) => {

//     req.body.id = notes.length.toString();

//     if (!validateNote(req.body)) {

//         res.status(400).send("The note is not properly formatted.");

//     } else {

//         const note = createNewNote(req.body, notes);

//         res.json(note);
//     }
// });


// module.exports = createNewNote;
