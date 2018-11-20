const express = require('express');

const dashboardController = require('../controller/dashboard');

const router = express.Router();

router.get('/index', dashboardController.showDashboard);

//router.get('/dashboard/data', dashboardController.getAllData);

router.get('/index/sat', dashboardController.getSatResults);

router.get('/index/range', dashboardController.getRangeResults);

router.get('/index/earnings', dashboardController.getearningsResults);

router.get('/index/grad', dashboardController.getgradResults);

router.get('/index/diversity', dashboardController.getdiversityResults);
module.exports = router;
