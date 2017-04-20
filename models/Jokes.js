const mongoose = require('mongoose');


let jokesSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},

});

const Jokes = mongoose.model('Jokes', jokesSchema);

module.exports = Jokes;
