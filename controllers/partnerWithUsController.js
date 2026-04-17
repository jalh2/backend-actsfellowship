const PartnerWithUsModel = require('../models/partnerWithUsModel')

const getPartnerWithUs = async (req, res) => {
  try {
    const doc = await PartnerWithUsModel.findOne()
    if (!doc) return res.json(PartnerWithUsModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updatePartnerWithUs = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.waysToPartner !== undefined) updateData.waysToPartner = payload.waysToPartner

    const doc = await PartnerWithUsModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getPartnerWithUs, updatePartnerWithUs }
