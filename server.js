// set up server to run the default heroku port, or local 3001 (for when launching locally during testing)
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./data/notes');

// moved this dependency to index.js
// const fs = require ('fs');



// determine the path for the routes



// On launch of this server file, the page can be viewed by visiting localhost:3001
// Some express black magic stuff here...
// app.use(express.urlencoded(({ extended: true })));
// app.use(express.json());
// app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);



app.get('/api/notes', (req, res) => {

    res.json(notes);

});


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application`)
})

