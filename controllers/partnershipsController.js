const PartnershipsModel = require('../models/partnershipsModel')

const getPartnerships = async (req, res) => {
  try {
    const doc = await PartnershipsModel.findOne()
    if (!doc) return res.json(PartnershipsModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updatePartnerships = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.partners !== undefined) updateData.partners = payload.partners

    const doc = await PartnershipsModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getPartnerships, updatePartnerships }
