const express = require('express')
const router = express.Router()
const { getMission, updateMission } = require('../controllers/missionController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getMission)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateMission)

module.exports = router
