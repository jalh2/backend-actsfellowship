const express = require('express')
const router = express.Router()
const { listPages, getPage, createPage, updatePage, deletePage, deletePageImage, addPageImage } = require('../controllers/fellowshipPageController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', listPages)
router.get('/:idOrSlug', getPage)

// Admin/SuperAdmin
router.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createPage)
router.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updatePage)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deletePage)

// Image operations
router.post('/:id/image', requireAuth, requireRole(['superAdmin', 'admin']), addPageImage)
router.delete('/:id/image/:idx', requireAuth, requireRole(['superAdmin', 'admin']), deletePageImage)

module.exports = router
