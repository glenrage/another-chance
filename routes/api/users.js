'use strict';

// require('dotenv').load();
const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

//route to create new users
router.post('/users', function(req, res, next) {

    const user = new User();

    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    user.company = req.body.user.company;
    user.position = req.body.user.position;
    user.phone = req.body.user.phone;

    user.save().then(function() {

    return res.json({user: user.toAuthJSON()})

  }).catch(next);
});

router.post('/users/login', function(req, res, next) {
  console.log('req body - ' + req.body)
  if(!req.body.user.email) {
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
   return res.status(422).json({errors: {password: "can't be blank"}});
 }

//use local strategy as defined in config for authentication. session:false to prevent Passport from serializing user info in the sesion. Callback will respond to client based off if authentication was successful or not
  passport.authenticate('local', {session: false}, function(err, user, info) {
    if(err) { return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next);
});

router.get('/user', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if(!user) { return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user) {
      if(!user) { return res.sendStatus(401); }

      // only update fields that were actually passed...
    if(typeof req.body.user.firstName !== 'undefined'){
      user.firstName = req.body.user.firstName;
    }
    if(typeof req.body.user.lastName !== 'undefined'){
      user.lastName = req.body.user.lastName;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.company !== 'undefined'){
      user.company = req.body.user.company;
    }
    if(typeof req.body.user.position !== 'undefined'){
      user.position = req.body.user.position;
    }
    if(typeof req.body.user.phone !== 'undefined'){
      user.phone = req.body.user.phone;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

module.exports = router;
