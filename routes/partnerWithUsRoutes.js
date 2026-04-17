const express = require('express')
const router = express.Router()
const { getPartnerWithUs, updatePartnerWithUs } = require('../controllers/partnerWithUsController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getPartnerWithUs)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updatePartnerWithUs)

module.exports = router
