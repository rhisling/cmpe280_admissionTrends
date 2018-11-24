const express = require('express');

const userController = require('../controller/UserController');


const router = express.Router();

router.get('/getUserScoreStats', userController.getScoreStats);
//router.post('/admin/add-entry', adminController.addEntry);

module.exports = router;