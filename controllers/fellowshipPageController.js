const FellowshipPageModel = require('../models/fellowshipPageModel')

const listPages = async (req, res) => {
  try {
    const publishedOnly = !req.session || !req.session.user
    const pages = await FellowshipPageModel.findAll(publishedOnly)
    const imagesCollection = require('../config').db.collection('fellowshipPageImages')
    const pagesWithImageCounts = await Promise.all(
      pages.map(async page => {
        const imagesSnapshot = await imagesCollection.where('fellowshipPageId', '==', page.id).get()
        return {
          ...page,
          images: [],
          imageCount: imagesSnapshot.size
        }
      })
    )
    res.json(pagesWithImageCounts)
  } catch (e) {
    console.error('listPages error:', {
      message: e.message,
      stack: e.stack,
      details: e.details || null,
      code: e.code || null,
      status: e.status || null
    })
    res.status(500).json({ message: 'Server error' })
  }
}

const getPage = async (req, res) => {
  try {
    const doc = await FellowshipPageModel.findByIdOrSlug(req.params.idOrSlug)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    const imagesCollection = require('../config').db.collection('fellowshipPageImages')
    const imagesSnapshot = await imagesCollection
      .where('fellowshipPageId', '==', doc.id)
      .get()
    const images = imagesSnapshot.docs
      .map(img => img.data())
      .sort((a, b) => {
        const aTime = a.createdAt || ''
        const bTime = b.createdAt || ''
        return aTime.localeCompare(bTime)
      })
      .map(img => img.image)
    const response = {
      ...doc,
      images
    }
    res.json(response)
  } catch (e) {
    console.error('getPage error:', {
      message: e.message,
      stack: e.stack,
      details: e.details || null,
      code: e.code || null,
      status: e.status || null,
      params: req.params
    })
    res.status(500).json({ message: 'Server error', error: e.message })
  }
}

const createPage = async (req, res) => {
  try {
    const { slug, title, description, menuLabel, isPublished, sortOrder } = req.body
    if (!title) return res.status(400).json({ message: 'Title is required' })
    if (!slug) return res.status(400).json({ message: 'Slug is required' })

    const existing = await FellowshipPageModel.findBySlug(slug)
    if (existing) return res.status(400).json({ message: 'Slug already exists' })

    const doc = await FellowshipPageModel.create({
      slug,
      title,
      description: description || '',
      images: [],
      menuLabel: menuLabel || title,
      isPublished: isPublished !== undefined ? isPublished : true,
      sortOrder: sortOrder || 0
    })
    res.status(201).json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updatePage = async (req, res) => {
  try {
    const existing = await FellowshipPageModel.findById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Fellowship page not found' })

    const { slug, title, description, menuLabel, isPublished, sortOrder } = req.body
    const updateData = {}
    if (slug !== undefined) {
      const slugCheck = await FellowshipPageModel.findBySlug(slug)
      if (slugCheck && slugCheck.id !== req.params.id) return res.status(400).json({ message: 'Slug already exists' })
      updateData.slug = slug
    }
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (menuLabel !== undefined) updateData.menuLabel = menuLabel
    if (isPublished !== undefined) updateData.isPublished = isPublished
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder

    const doc = await FellowshipPageModel.update(req.params.id, updateData)
    res.json({ message: 'Fellowship page updated successfully', page: doc })
  } catch (e) {
    console.error('updatePage error:', {
      message: e.message,
      stack: e.stack,
      details: e.details || null,
      code: e.code || null,
      status: e.status || null,
      params: req.params,
      bodyKeys: Object.keys(req.body),
      imagesCount: Array.isArray(req.body.images) ? req.body.images.length : 'not an array',
      imagesSize: Array.isArray(req.body.images) ? JSON.stringify(req.body.images).length : 'N/A'
    })
    res.status(500).json({ message: 'Failed to update fellowship page', error: e.message })
  }
}

const deletePage = async (req, res) => {
  try {
    const existing = await FellowshipPageModel.findById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Not found' })
    const imagesCollection = require('../config').db.collection('fellowshipPageImages')
    const imagesSnapshot = await imagesCollection.where('fellowshipPageId', '==', req.params.id).get()
    if (!imagesSnapshot.empty) {
      const batch = require('../config').db.batch()
      imagesSnapshot.docs.forEach(doc => batch.delete(doc.ref))
      await batch.commit()
    }
    await FellowshipPageModel.remove(req.params.id)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deletePageImage = async (req, res) => {
  try {
    const { id, idx } = req.params
    const imagesCollection = require('../config').db.collection('fellowshipPageImages')
    const imagesSnapshot = await imagesCollection
      .where('fellowshipPageId', '==', id)
      .get()
    if (imagesSnapshot.empty) {
      return res.status(404).json({ message: 'No images found for this fellowship page' })
    }
    const images = imagesSnapshot.docs.map(img => ({
      id: img.id,
      ...img.data()
    })).sort((a, b) => {
      const aTime = a.createdAt || ''
      const bTime = b.createdAt || ''
      return aTime.localeCompare(bTime)
    })
    if (idx < 0 || idx >= images.length) {
      return res.status(400).json({ message: 'Invalid image index' })
    }
    const imageToDelete = images[idx]
    await imagesCollection.doc(imageToDelete.id).delete()
    res.json({ 
      message: 'Image deleted successfully', 
      deletedImageId: imageToDelete.id,
      deletedAt: new Date().toISOString()
    })
  } catch (e) {
    console.error('deletePageImage error:', {
      message: e.message,
      stack: e.stack,
      details: e.details || null,
      code: e.code || null,
      status: e.status || null,
      params: req.params
    })
    res.status(500).json({ message: 'Failed to delete image' })
  }
}

const addPageImage = async (req, res) => {
  console.log('addPageImage request:', {
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    bodyKeys: Object.keys(req.body),
    hasImage: !!req.body.image,
    imageSize: req.body.image ? req.body.image.length : 'N/A'
  })
  try {
    console.log('addPageImage: parsing request body')
    const { image } = req.body
    if (!image || typeof image !== 'string') {
      console.log('addPageImage: validation failed - no image or not string')
      return res.status(400).json({ message: 'Valid image data is required' })
    }
    console.log('addPageImage: fetching fellowship page')
    const doc = await FellowshipPageModel.findById(req.params.id)
    if (!doc) {
      console.log('addPageImage: fellowship page not found')
      return res.status(404).json({ message: 'Fellowship page not found' })
    }
    const imageDoc = {
      fellowshipPageId: req.params.id,
      image: image,
      createdAt: new Date().toISOString()
    }
    console.log('addPageImage: storing image in subcollection')
    const imagesCollection = require('../config').db.collection('fellowshipPageImages')
    const imageRef = await imagesCollection.add(imageDoc)
    console.log('addPageImage: image stored successfully')
    res.json({ 
      message: 'Image added successfully', 
      imageId: imageRef.id,
      fellowshipPageId: req.params.id
    })
  } catch (e) {
    console.error('addPageImage error:', {
      message: e.message,
      stack: e.stack,
      details: e.details || null,
      code: e.code || null,
      status: e.status || null,
      params: req.params,
      bodyKeys: Object.keys(req.body),
      imageSize: req.body.image ? req.body.image.length : 'N/A'
    })
    res.status(500).json({ message: 'Failed to add image', error: e.message })
  }
}

module.exports = { listPages, getPage, createPage, updatePage, deletePage, deletePageImage, addPageImage }
