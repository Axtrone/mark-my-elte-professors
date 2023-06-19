const https = require("https");
const express = require('express');
const app = express();
const helmet = require("helmet");
const compression = require("compression");

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(compression());

require('./route/index')(app);

app.use((err, req, res, next) => {
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});