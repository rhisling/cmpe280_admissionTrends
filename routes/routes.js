const express = require('express');
const router = express.Router();

const controllerMain = require('../controller/main');
//const passport = require('../config/passport');

router.get('/', controllerMain.root);
router.post('/login', controllerMain.loginPost);

router.get('/signup', controllerMain.signupGet);
router.post('/signup', controllerMain.signupPost);

router.get('/logout', controllerMain.logout);

module.exports = router;
