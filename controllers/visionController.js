const VisionModel = require('../models/visionModel')

const getVision = async (req, res) => {
  try {
    const doc = await VisionModel.findOne()
    if (!doc) return res.json(VisionModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateVision = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.sections !== undefined) updateData.sections = payload.sections

    const doc = await VisionModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getVision, updateVision }
