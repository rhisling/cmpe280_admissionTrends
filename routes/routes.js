const express = require('express');
const router = express.Router();

const controllerMain = require('../controller/main');
//const passport = require('../config/passport');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

router.get('/', controllerMain.root);
router.post('/login', controllerMain.loginPost);

router.get('/signup', controllerMain.signupGet);
router.post('/signup', controllerMain.signupPost);

/* router.get('/home', controllerMain.index);
router.get('/index', isLoggedIn, controllerMain.index); */

router.get('/logout', controllerMain.logout);

router.get('/ucb', controllerMain.ucb);
router.get('/uci', controllerMain.uci);
router.get('/ucsd', controllerMain.ucsd);
router.get('/ucla', controllerMain.ucla);
router.get('/ucsf', controllerMain.ucsf);

module.exports = router;
