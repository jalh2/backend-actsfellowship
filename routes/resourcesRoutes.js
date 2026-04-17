const express = require('express')
const router = express.Router()
const { getResources, updateResources } = require('../controllers/resourcesController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getResources)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateResources)

module.exports = router
