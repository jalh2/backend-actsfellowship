const express = require('express')
const router = express.Router()
const { getSubmissions, createSubmission, updateSubmissionStatus, deleteSubmission } = require('../controllers/enrollGroupController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.post('/', createSubmission)

// Admin/SuperAdmin
router.get('/', requireAuth, requireRole(['superAdmin', 'admin']), getSubmissions)
router.put('/:id/status', requireAuth, requireRole(['superAdmin', 'admin']), updateSubmissionStatus)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deleteSubmission)

module.exports = router
