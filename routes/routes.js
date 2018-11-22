const express = require("express");
const router = express.Router();

const controllerMain = require("../controller/main");
const passport = require('../config/passport');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

router.get('/', controllerMain.login);
router.post('/login', passport.authenticate('local-login', {failureRedirect: '/'}), controllerMain.index);
router.post('/chart1', controllerMain.chart1);
router.post('/chart2', controllerMain.chart2);
router.post('/chart3', controllerMain.chart3);
router.get('/home', controllerMain.index);
router.get('/index', isLoggedIn, controllerMain.index);
router.post('/logout', controllerMain.logout);
router.get('/ucb',controllerMain.ucb);
router.get('/uci',controllerMain.uci);
router.get('/ucsd',controllerMain.ucsd);
router.get('/ucla',controllerMain.ucla);
router.get('/ucsb',controllerMain.ucsb);
router.get('/ucr',controllerMain.ucr);
router.get('/ucm',controllerMain.ucm);
router.get('/ucb',controllerMain.ucb);

module.exports = router;