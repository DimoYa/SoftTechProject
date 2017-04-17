const Article = require('mongoose').model('Article');

function ValidateArticle(articleArgs, req) {

    let errorMsg = '';

    if (!req.isAuthenticated()) {
        errorMsg = 'You should be logged in to operate with articles!'
    } else if (!articleArgs.title) {
        errorMsg = 'invalid Title!';
    }else if (!articleArgs.content) {
        errorMsg = 'invalid content!';
    }

    return errorMsg;
}

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;

        let errorMsg = ValidateArticle(articleArgs, req);

        if (errorMsg) {
            res.render('article/create', {error: errorMsg});
            return;
        }

        articleArgs.author = req.user.id;
        Article.create(articleArgs).then(article => {
            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err) {
                    res.redirect('/', {error: err.message});
                } else {
                    res.redirect('/');
                }
            })
        })
    },

    details: (req, res) => {
        let id = req.params.id;

        Article.findById(id).populate('author').then(article => {
            res.render('article/details', article);
        })
    },

    editGet: (req, res) => {

        let id = req.params.id;
        Article.findById(id).then(article => {
            res.render('article/edit', article)
        });
    },
    editPost: (req, res) => {

        let id = req.params.id;
        let articleArgs = req.body;
        let errorMsg = ValidateArticle(articleArgs, req);

        if (errorMsg) {
            res.render('article/edit', {error: errorMsg});
            return;

        }

        Article.update({_id: id}, {$set: {title: articleArgs.title, content: articleArgs.content}})
            .then(err => {


                res.redirect('/article/details/${id}');

            });
    }
};