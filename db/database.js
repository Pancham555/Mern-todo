var mongoose = require('mongoose');

var notesdb = new mongoose.Schema({
    // notename: String,
    note: String
});

module.exports = mongoose.model('todo', notesdb);