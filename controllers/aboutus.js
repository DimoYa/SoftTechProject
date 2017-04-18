const AboutUs = require('mongoose').model('AboutUs');

module.exports = {
    AboutUsGet: (req, res) => {
        res.render('AboutUs/AboutUs');
    }
}



