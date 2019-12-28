const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator')
const UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash
        next()
    })
})
const User = mongoose.model('User', UserSchema)
module.exports = User
UserSchema.plugin(uniqueValidator);