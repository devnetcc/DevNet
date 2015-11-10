var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
name: {type: String, lowercase: true, trim: true},
lastName: { type: String, lowercase: true, trim: true},
email: { unique: true, type:String, lowercase: true, trim: true},
isValidated: Boolean, // Checks if the user has been validated via email
rand: Number,
create: Date,
pic: String,
location: String, //should there be separate props for city, state, country?
role: String,
title: String,
userBeen: String,
userAt: String,
userGoing: String,
github: String,
linkedinUrl: String,
profilePosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProfilePost'}],
forumPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost'}],
followers: [],
following: [],
languages: [{lang: String, level: Number}],
joined: Date,
passwordHash: String,
salt: String,
summary: String,
linkedin: {
  id: String,
  token: String,
  email: String,
  name: String,
  lastName: String,
  photo: String,
  summary: String,
  profileUrl: String,
},
});

UserSchema.methods.setPassword = function(password) {
 this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
 var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
 return (passwordHash === this.passwordHash);
};

UserSchema.methods.generateJWT = function() {
 return jwt.sign({
   _id: this._id,
   name: this.name,
   lastName: this.lastName,
   email: this.email,
   pic: this.pic

 },  "CoderCamps"); //Add Passcode here
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// UserSchema.pre('save', function(next) {
//   var user = this;
//   var SALT_FACTOR = 5;
//
//   if (!user.isModified('password')) return next();
//
//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });


mongoose.model('User', UserSchema);
