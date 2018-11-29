const express = require('express');

const adminController = require('../controller/admin');
const mainController = require('../controller/main');
const router = express.Router();

router.get('/admin', adminController.showAdminPage);
router.get('/admin/add-entry', adminController.addEntryPage); // new
router.get('/admin/update-entry', adminController.updateEntryPage); // edit
router.get('/admin/delete-entry', adminController.showDeletePage);
router.get('/admin/find-entry', adminController.showFindPage);
router.get('/admin/find-all-entry', adminController.findAllEntry); // Index - read all users - GET

router.post('/admin/add-entry', adminController.addEntry); // Create - create a new user from data - POST
router.get('/admin/find-entry-univ/', adminController.findEntry); // Show - read a user - GET
//router.post('/admin/find-entry/', adminController.findEntry); // Show - read a user - GET
router.post('/admin/delete-entry/', adminController.deleteEntry); //Delete a user - DELETE / POST
router.post('/admin/update-entry/', adminController.updateEntry); // Update a user - PUT / POST
router.get('/admin/logout', mainController.logout);
//router.post('/login', AuthController.login_user);
module.exports = router;
