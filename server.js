const express = require('express');


// moved this dependency to index.js
// const fs = require ('fs');

// set up server port to run the server
const PORT = process.env.PORT || 3001;
const app = express();

// determine the path for the routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// On launch of this server file, the page can be viewed by visiting localhost:3001
// Some express black magic stuff here...
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}, visit localhost:3001 on your browser to see the application`)
})

