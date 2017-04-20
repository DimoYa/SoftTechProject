const Recipes = require('mongoose').model('Jokes');

module.exports = {
    RecipesGet: (req, res) => {
        res.render('Recipes/Recipes');
    }
}



