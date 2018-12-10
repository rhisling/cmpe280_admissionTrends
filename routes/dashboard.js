const express = require('express');

const dashboardController = require('../controller/dashboard');

const router = express.Router();

router.get('/index', dashboardController.showDashboard);

//router.get('/dashboard/data', dashboardController.getAllData);

router.get('/index/tuition', dashboardController.getTuition);

router.get('/index/alltuition', dashboardController.getAllTuition);

router.get('/index/sat', dashboardController.getSatResults);

router.get('/index/range', dashboardController.getRangeResults);

router.get('/index/earnings', dashboardController.getearningsResults);

router.get('/index/grad', dashboardController.getgradResults);

router.get('/index/diversity', dashboardController.getdiversityResults);

router.get('/index/tuition-out', dashboardController.getTuitionOut);

router.get('/index/tuition-in', dashboardController.getTuitionIn);

router.get('/index/retentionrate', dashboardController.getRetentionRate);

router.get('/index/loan', dashboardController.getLoan);

router.get('/index/gender', dashboardController.getGender);

router.get('/index/expenditure', dashboardController.getExpenditure);

/**
 * recently added routes
 */
router.get('/recentdash/admitrate', dashboardController.getAdmitrate);
router.get('/recentdash/gpa', dashboardController.getGPA);
router.get('/recentdash/retentionrate', dashboardController.getRetentionRate);


/**
 * For page
 */
router.get('/univ-overview', dashboardController.getUnivOverview);

module.exports = router;
