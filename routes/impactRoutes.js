const express = require('express')
const router = express.Router()
const { getImpact, updateImpact } = require('../controllers/impactController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getImpact)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateImpact)

module.exports = router
