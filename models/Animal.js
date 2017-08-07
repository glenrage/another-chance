'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug')

const AnimalSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: {type: String, index: true},
  type: {type: String, index: true},
  breed: String,
  weight: String,
  age: String,
  bloodType: {type: String, index: true},
  contactName: String,
  contactNumber: String,
  vetName: String,
  location: {type: String, index: true},
  photo: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

AnimalSchema.plugin(uniqueValidator, {message: 'is already taken'});

//take name of animal and generate unique slug url
AnimalSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 4) | 0).toString(36);
}

//generate slug before Mongoose tries to validate model
AnimalSchema.pre('validate', function(next) {
  if(!this.slug) {
    this.slugify();
  }
  next();
});

AnimalSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    name: this.name,
    type: this.type,
    breed: this.breed,
    weight: this.weight,
    age: this.age,
    bloodType: this.bloodType,
    contactName: this.contactName,
    contactNumber: this.contactNumber,
    vetName: this.vetName,
    location: this.location,
    photo: this.photo,
    createdBy: this.createdBy.toProfileJSONFor(user)
  };
};

mongoose.model('Animal', AnimalSchema);
