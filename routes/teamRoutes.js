const express = require('express')
const router = express.Router()
const { getTeam, updateTeam, updateMemberImage, removeMemberImage } = require('../controllers/teamController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getTeam)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateTeam)

// Member image operations
router.put('/members/:index/image', requireAuth, requireRole(['superAdmin', 'admin']), updateMemberImage)
router.delete('/members/:index/image', requireAuth, requireRole(['superAdmin', 'admin']), removeMemberImage)

module.exports = router
