const MyProfile = require('mongoose').model('MyProfile');
const Article = require('mongoose').model('Article');
const User = require('mongoose').model('User');

module.exports = {
    MyProfileGet: (req, res) => {
        let articleArgs = req.body;
        let userId = req.user.id;

        Article.find({author:userId}).sort({_id:-1}).populate('author').then(articles => {
            for(let article of articles){
                if(article.content.length > 200) {
                    article.content = article.content.substring(0, 200) + '...';
                }
            }
            res.render('user/MyProfile', {
                articles
            });
        });
    }
}



