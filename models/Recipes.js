const mongoose = require('mongoose');


let recipesSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},

});

const Recipes = mongoose.model('Recipes', recipesSchema);

module.exports = Recipes;
