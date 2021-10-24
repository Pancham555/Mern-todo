
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/todo';
mongoose.connect(mongoDB)
    .then(() => console.log("DB connected")).catch(err => console.log(err));
