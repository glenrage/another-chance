'use strict';

const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');
const User = mongoose.model('User');
const auth = require('../auth');

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {

    let animal = new Animal(req.body.animal);

    animal.author = user;

    return animal.save().then(function() {
      console.log(animal.author)
      return res.json({animal: animal.toJSONFor(user)});
    });
  }).catch(next);
});

//intercept all queries related to animal and add animals data to req.animal for other routes to use
router.param('animal', function(req, res, next, slug) {
  Animal.findOne({ slug: slug})
    .populate('author')
    .then(function(article) {
      if (!article) { return res.sendStatus(404); }

      req.animal = animal;

      return next();
    }).catch(next);
})

router.get('/:animal', auth.required, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.animal.populate('author').execPopulate()
  ]).then(function(results) {
    let user = results[0];

    return res.json({animal: req.animal.toJSONFor(user)});
  }).catch(next);
});



module.exports = router;
