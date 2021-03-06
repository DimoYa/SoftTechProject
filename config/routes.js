const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const aboutUsController = require('./../controllers/aboutus');
const JokesController = require('./../controllers/jokes');
const RecipesController = require('./../controllers/Recipes');
const MyProfileController = require('./../controllers/MyProfile');


module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);
    app.get('/article/details/:id', articleController.details);
    app.get('/article/edit/:id', articleController.editGet);
    app.post('/article/edit/:id', articleController.editPost);
    app.get('/article/delete/:id', articleController.deleteGet);
    app.post('/article/delete/:id', articleController.deletePost);
    app.get('/AboutUs/AboutUs', aboutUsController.AboutUsGet);
    app.get('/Jokes/Jokes', JokesController.JokesGet);
    app.get('/Recipes/Recipes', RecipesController.RecipesGet);
    app.get('/User/MyProfile', MyProfileController.MyProfileGet);

};

