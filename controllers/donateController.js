const DonateModel = require('../models/donateModel')

const getDonate = async (req, res) => {
  try {
    const doc = await DonateModel.findOne()
    if (!doc) return res.json(DonateModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateDonate = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.donationOptions !== undefined) updateData.donationOptions = payload.donationOptions
    if (payload.paymentMethods !== undefined) updateData.paymentMethods = payload.paymentMethods

    const doc = await DonateModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getDonate, updateDonate }
