const MyProfile = require('mongoose').model('MyProfile');

module.exports = {
    MyProfileGet: (req, res) => {
        res.render('User/MyProfile');
    }
}



