const express = require('express')
const router = express.Router()
const { getVision, updateVision } = require('../controllers/visionController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getVision)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateVision)

module.exports = router
