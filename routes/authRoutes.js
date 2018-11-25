const express = require('express');
const router = express.Router();
const passport = require('../services/passport');
router.post(
  '/api/local',
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/'
  })
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    //res.redirect('/api/current_user');
    res.redirect('/index');
  }
);

module.exports = router;
