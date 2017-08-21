const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // validates unqiue inputs
const crypto = require('crypto'); // hash plugin for password encryption
const jwt = require('jsonwebtoken'); // JSON web token plugin
const secret = require('../config').secret; // secret to validate JSON web tokens

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    lastName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    company: String,
    position: String,
    phoneNumber: String,
    admin: { type: Boolean, default: true },
    hash: String,
    salt: String,
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id, // database ID of user
      email: this.email,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret,
  );
};

// returns JSON representation of user for authentication
UserSchema.methods.toAuthJSON = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    token: this.generateJWT(),
    company: this.company,
    position: this.position,
    phoneNumber: this.phoneNumber,
    admin: this.admin,
  };
};

UserSchema.methods.toProfileJSONFor = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    company: this.company,
    position: this.position,
    phoneNumber: this.phoneNumber,
  };
};

mongoose.model('User', UserSchema);
