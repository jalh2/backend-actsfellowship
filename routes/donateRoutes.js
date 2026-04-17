const express = require('express')
const router = express.Router()
const { getDonate, updateDonate } = require('../controllers/donateController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getDonate)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateDonate)

module.exports = router
