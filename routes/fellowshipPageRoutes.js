const express = require('express')
const router = express.Router()
const { listPages, getPage, createPage, updatePage, deletePage, deletePageImage, addPageImage } = require('../controllers/fellowshipPageController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', listPages)
router.get('/:idOrSlug', getPage)

// Admin/SuperAdmin
router.post('/', createPage)
router.put('/:id', updatePage)
router.delete('/:id', deletePage)

// Image operations (no auth)
router.post('/:id/image', addPageImage)
router.delete('/:id/image/:idx', deletePageImage)

module.exports = router
