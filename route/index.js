const sqlite3 = require('sqlite3');
const renderMW = require('../middleware/renderMW');
const getTeacherSearch = require('../middleware/getTeacherSearch');
const getTeacherDetails = require('../middleware/getTeacherDetails');

const db = new sqlite3.Database('database.db');

module.exports = function(app) {
    app.get(
        '/search',
        getTeacherSearch(db),
        renderMW('search')
    );
    app.get(
        '/teacher/:id',
        getTeacherDetails(db),
        renderMW('teacher')
    );
    app.get(
        '/',
        renderMW('index')
    );
    app.use(
        '*',
        function (req, res, next) {
            res.redirect('/');
        }
    )
};