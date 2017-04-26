const mongoose = require('mongoose');


let MyProfileSchema = mongoose.Schema({
    imagePath: {type: String},


});

const MyProfile = mongoose.model('MyProfile', MyProfileSchema);

module.exports = MyProfile;
