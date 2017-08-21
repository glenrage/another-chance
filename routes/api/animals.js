const router = require('express').Router();
const mongoose = require('mongoose');

const Animal = mongoose.model('Animal');
const User = mongoose.model('User');
const auth = require('../auth');

// Create new Animal route
router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then((user) => {
      const animal = new Animal(req.body.animal);

      animal.createdBy = user;

      return animal.save().then(() => {
        console.log(`animal createdBy ${animal.createdBy}`);
        return res.json({ animal: animal.toJSONFor(user) });
      });
    })
    .catch(next);
});

// intercept all queries related to animal and add
// animals data to req.animal for other routes to use
router.param('animal', (req, res, next, slug) => {
  Animal.findOne({ slug })
    .populate('createdBy')
    .then((animal) => {
      if (!animal) {
        return res.sendStatus(404);
      }

      req.animal = animal;
      console.log(`animal req object${animal}`);
      return next();
    })
    .catch(next);
});

// Combine all queries into a single Promise with Promise.all().
// This method takes an array of promises and tries to resolve all promises,
// then passes an array of resolved values to the attached .then handler.
// Any values not wrapped in a promise will be considered resolved.
router.get('/', auth.optional, (req, res, next) => {
  const query = {};
  let limit = 20; // how many animals being returned
  let offset = 0; // number of animals to skip for query

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  Promise.all([req.query.createdBy ? User.findOne({ firstName: req.query.createdBy }) : null])
    .then((results) => {
      const createdBy = results[0];

      if (createdBy) {
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
      ]).then(() => {
        const animals = results[0];
        const animalsCount = results[1];
        const user = results[2];

        return res.json({
          animals: animals.map(animal => animal.toJSONFor(user)),
          animalsCount,
        });
      });
    })
    .catch(next);
});

// Get single animal entry
router.get('/:animal', auth.required, (req, res, next) => {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.animal.populate('createdBy').execPopulate(),
  ])
    .then((results) => {
      const user = results[0];

      return res.json({ animal: req.animal.toJSONFor(user) });
    })
    .catch(next);
});

// Update animal entry
router.put('/:animal', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (req.animal.createdBy._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.animal.name !== 'undefined') {
        req.animal.name = req.body.animal.name;
      }
      if (typeof req.body.animal.type !== 'undefined') {
        req.animal.type = req.body.animal.type;
      }
      if (typeof req.body.animal.breed !== 'undefined') {
        req.animal.breed = req.body.animal.breed;
      }
      if (typeof req.body.animal.weight !== 'undefined') {
        req.animal.weight = req.body.animal.weight;
      }
      if (typeof req.body.animal.age !== 'undefined') {
        req.animal.age = req.body.animal.age;
      }
      if (typeof req.body.animal.bloodType !== 'undefined') {
        req.animal.bloodType = req.body.animal.bloodType;
      }
      if (typeof req.body.animal.contactName !== 'undefined') {
        req.animal.contactName = req.body.animal.contactName;
      }
      if (typeof req.body.animal.contactNumber !== 'undefined') {
        req.animal.contactNumber = req.body.animal.contactNumber;
      }
      if (typeof req.body.animal.contactEmail !== 'undefined') {
        req.animal.contactEmail = req.body.animal.contactEmail;
      }
      if (typeof req.body.animal.vetName !== 'undefined') {
        req.animal.vetName = req.body.animal.vetName;
      }
      if (typeof req.body.animal.location !== 'undefined') {
        req.animal.location = req.body.animal.location;
      }

      req.animal.save().then(animal => res.json({ animal: animal.toJSONFor(user) })).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// Delete animal record
router.delete('/:animal', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(() => {
      if (req.animal.createdBy._id.toString() === req.payload.id.toString()) {
        return req.animal.remove().then(() => res.sendStatus(204));
      }
      return res.sendStatus(403);
    })
    .catch(next);
});

module.exports = router;
