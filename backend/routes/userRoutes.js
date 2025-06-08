const express = require('express');
const router = express.Router();
const { FormSubmission,GetLeads,DeleteContact } = require('../controllers/userController');

router.post('/contact', FormSubmission);
router.get('/get-all-leads', GetLeads);
router.post("/deletecontact",DeleteContact)

// router.post('/login', loginUser);

module.exports = router;
