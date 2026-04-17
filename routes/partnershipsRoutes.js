const express = require('express')
const router = express.Router()
const { getPartnerships, updatePartnerships } = require('../controllers/partnershipsController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getPartnerships)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updatePartnerships)

module.exports = router
