const mongoose = require('mongoose');
const Role = mongoose.model('Role');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        fullName: {type: String, required: true},
        articles: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Article' }],
        roles: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Role' }],
        salt: {type: String, required: true},
        avatarPath: {type: String},
    }
);

userSchema.method ({
   authenticate: function (password) {
       let inputPasswordHash = encryption.hashPassword(password, this.salt);
       let isSamePasswordHash = inputPasswordHash === this.passwordHash;

       return isSamePasswordHash;
   },

    isAuthor: function (article) {

        if (!article) {
            return false;
        }
        let isAuthor = article.author.equals(this.id);
        return isAuthor;

    },


    isInRole: function (rolename) {
        return Role.findOne({name: rolename}).then(role => {
            if (!role) {
                return false;
            }
            let isInRole = this.roles.indexOf(role.id) !== -1;
            return isInRole;
         })
        
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.initialize = () => {
    let email = 'admin@admin.bg';
    User.findOne({email: email}).then(admin => {
        if (admin) {

            return;
        }

        Role.findOne({name: 'Admin'}).then(role => {

            if (!role) {

                return;
            }
            let salt = encryption.generateSalt();
            let passwordHash = encryption.hashPassword('admin123456', salt);

            let adminUser = {
                email: email,
                fullName: 'Admin',
                roles: [role.id],
                articles: [],
                salt: salt,
                passwordHash: passwordHash

            };

            User.create(adminUser).then(user => {
                role.users.push(user.id);
                role.save();
            });

        })
    })
    };



