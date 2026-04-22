const express = require('express')
const router = express.Router()
const { getTestimonials, updateTestimonials } = require('../controllers/testimonialsController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getTestimonials)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateTestimonials)

module.exports = router
