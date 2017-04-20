const Jokes = require('mongoose').model('Jokes');

module.exports = {
    JokesGet: (req, res) => {
        res.render('Jokes/Jokes');
    }
}



