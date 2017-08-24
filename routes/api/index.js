const router = require('express').Router();

router.use('/', require('./users'));
router.use('/animals', require('./animals'));

// error route handler to convert mongoose validation
// errors so the front end can consume otherwise would return 500 internal server error
router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
