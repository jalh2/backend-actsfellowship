const MissionModel = require('../models/missionModel')

const getMission = async (req, res) => {
  try {
    const doc = await MissionModel.findOne()
    if (!doc) return res.json(MissionModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateMission = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.sections !== undefined) updateData.sections = payload.sections

    const doc = await MissionModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getMission, updateMission }
