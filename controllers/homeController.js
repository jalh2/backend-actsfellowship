const HomeModel = require('../models/homeModel')

const getHome = async (req, res) => {
  try {
    const doc = await HomeModel.findOne()
    if (!doc) return res.json(HomeModel.defaults)
    res.json({ ...HomeModel.defaults, ...doc })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateHome = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.heroTitle !== undefined) updateData.heroTitle = payload.heroTitle
    if (payload.heroDescription !== undefined) updateData.heroDescription = payload.heroDescription
    if (payload.heroImages !== undefined && Array.isArray(payload.heroImages)) updateData.heroImages = payload.heroImages
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.cards !== undefined && Array.isArray(payload.cards)) updateData.cards = payload.cards
    if (payload.stats !== undefined && Array.isArray(payload.stats)) updateData.stats = payload.stats
    if (payload.statsTitle !== undefined) updateData.statsTitle = payload.statsTitle
    if (payload.statsDescription !== undefined) updateData.statsDescription = payload.statsDescription
    if (payload.missionSection !== undefined) updateData.missionSection = payload.missionSection
    if (payload.aboutSection !== undefined) updateData.aboutSection = payload.aboutSection
    if (payload.fellowshipSection !== undefined) updateData.fellowshipSection = payload.fellowshipSection
    if (payload.partnerSection !== undefined) updateData.partnerSection = payload.partnerSection

    const doc = await HomeModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getHome, updateHome }
