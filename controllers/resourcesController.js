const ResourcesModel = require('../models/resourcesModel')

const getResources = async (req, res) => {
  try {
    const doc = await ResourcesModel.findOne()
    if (!doc) return res.json(ResourcesModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateResources = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.sections !== undefined) updateData.sections = payload.sections

    const doc = await ResourcesModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getResources, updateResources }
