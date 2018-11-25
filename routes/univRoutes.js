const express = require('express');

const univController = require('../controller/univ');

const router = express.Router();

router.get('/ucb', univController.showUcb);
router.get('/uci', univController.showUci);
router.get('/ucsd', univController.showUcsd);
router.get('/ucla', univController.showUcla);
router.get('/ucsb', univController.showUcsb);
router.get('/ucr', univController.showUcr);
router.get('/ucm', univController.showUcm);
router.get('/ucsc', univController.showUcsc);
router.get('/ucd', univController.showUcd);

module.exports = router;
