// const fs = require('fs');
// const path = require('path');

// function createNewNote(body, notesArray) {
//     // note or newNote for the variable, not sure, must test both
//     const note = body;

//     notesArray.push(note);

//     fs.writeFileSync(
//         path.join(__dirname, '../data/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );

//     return note;


// }

// module.exports = createNewNote;