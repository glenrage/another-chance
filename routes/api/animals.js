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

    animal.createdBy = user;

    return animal.save().then(function() {
      console.log('animal createdBy ' + animal.createdBy)
      return res.json({animal: animal.toJSONFor(user)});
    });
  }).catch(next);
});

//intercept all queries related to animal and add animals data to req.animal for other routes to use
router.param('animal', function(req, res, next, slug) {
  Animal.findOne({ slug: slug})
    .populate('createdBy')
    .then(function(animal) {
      if (!animal) { return res.sendStatus(404); }

      req.animal = animal;
      console.log('animal req object' + animal)
      return next();
    }).catch(next);
})

//Combine all queries into a single Promise with Promise.all(). This method takes an array of promises and tries to resolve all promises, then passes an array of resolved values to the attached .then handler. Any values not wrapped in a promise will be considered resolved.
router.get('/', auth.optional, function(req, res, next) {
  let query = {}
  let limit = 20; //how many animals being returned
  let offset = 0; //number of animals to skip for query

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Promise.all([
    req.query.createdBy ? User.findOne({firstName: req.query.createdBy}) : null
  ]).then(function(results) {
    let createdBy = results[0];

    if(createdBy) {
      query.createdBy = createdBy._id;
    }

  return Promise.all([
    Animal.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      // .sort({createdAt:'name'})
      .populate('createdBy')
      .exec(),
    Animal.count(query).exec(),
    req.payload ? User.findById(req.payload.id) : null,
  ]).then(function(results) {
    let animals = results[0];
    let animalsCount = results[1];
    let user = results[2];

    return res.json({
      animals: animals.map(function(animal){
        return animal.toJSONFor(user);
      }),
      animalsCount: animalsCount
    });
    });
  }).catch(next);
})


router.get('/:animal', auth.required, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.animal.populate('createdBy').execPopulate()
  ]).then(function(results) {
    let user = results[0];

    return res.json({animal: req.animal.toJSONFor(user)});
  }).catch(next);
});

router.put('/:animal', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if(req.animal.createdBy._id.toString() === req.payload.id.toString()) {

      if(typeof req.body.animal.name !== 'undefined') {
        req.animal.name = req.body.animal.name;
      }
      if(typeof req.body.animal.type !== 'undefined') {
        req.animal.type = req.body.animal.type;
      }
      if(typeof req.body.animal.breed !== 'undefined') {
        req.animal.breed = req.body.animal.breed;
      }
      if(typeof req.body.animal.weight !== 'undefined') {
        req.animal.weight = req.body.animal.weight;
      }
      if(typeof req.body.animal.age !== 'undefined') {
        req.animal.age = req.body.animal.age;
      }
      if(typeof req.body.animal.bloodType !== 'undefined') {
        req.animal.bloodType = req.body.animal.bloodType;
      }
      if(typeof req.body.animal.contactName !== 'undefined') {
        req.animal.contactName = req.body.animal.contactName;
      }
      if(typeof req.body.animal.contactNumber !== 'undefined') {
        req.animal.contactNumber = req.body.animal.contactNumber;
      }
      if(typeof req.body.animal.vetName !== 'undefined') {
        req.animal.vetName = req.body.animal.vetName;
      }
      if(typeof req.body.animal.location !== 'undefined') {
        req.animal.location = req.body.animal.location;
      }

      req.animal.save().then(function(animal) {
        return res.json({animal: animal.toJSONFor(user)});
      }).catch(next);

    } else {
      return res.sendStatus(403);
    }
  })
})

router.delete('/:animal', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function() {
    if(req.animal.createdBy._id.toString() === req.payload.id.toString()) {
      return req.animal.remove().then(function() {
        return res.sendStatus(204)
      })
    } else {
      return res.sendStatus(403);
    }
  }).catch(next)
})

module.exports = router;
