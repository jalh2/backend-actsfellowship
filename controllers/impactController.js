const ImpactModel = require('../models/impactModel')

const getImpact = async (req, res) => {
  try {
    const doc = await ImpactModel.findOne()
    if (!doc) return res.json(ImpactModel.defaults)
    res.json({ ...ImpactModel.defaults, ...doc })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateImpact = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.stats !== undefined) updateData.stats = payload.stats
    if (payload.content !== undefined) updateData.content = payload.content
    if (payload.countries !== undefined) updateData.countries = payload.countries

    const doc = await ImpactModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getImpact, updateImpact }
