const express = require('express');

const adminController = require('../controller/admin');
const router = express.Router();

router.get('/admin', adminController.showAdminPage);
router.post('/admin/add-entry', adminController.addEntry); // Create - create a new user from data - POST
router.get('/admin/find-entry/:INSTNM', adminController.findEntry); // Show - read a user - GET
//router.post('/admin/find-entry/', adminController.findEntry); // Show - read a user - GET
router.get('/admin/find-all-entry', adminController.findAllEntry); // Index - read all users - GET
router.post('/admin/delete-entry/', adminController.deleteEntry); //Delete a user - DELETE / POST
router.post('/admin/update-entry/', adminController.updateEntry); // Update a user - PUT / POST

router.get('/admin/add-entry', adminController.addEntryPage); // new
router.get('/admin/update-entry', adminController.updateEntryPage); // edit
//router.post('/login', AuthController.login_user);
module.exports = router;
