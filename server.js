const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static('./dist/puncare'));


app.use(express.static(__dirname + '/dist'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/puncare/'}),
// );

app.listen(process.env.PORT || 8080);
