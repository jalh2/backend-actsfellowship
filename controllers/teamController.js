const TeamModel = require('../models/teamModel')

const getTeam = async (req, res) => {
  try {
    const doc = await TeamModel.findOne()
    if (!doc) return res.json(TeamModel.defaults)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateTeam = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.members !== undefined) updateData.members = payload.members
    if (payload.advisoryBoard !== undefined) updateData.advisoryBoard = payload.advisoryBoard

    const doc = await TeamModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getTeam, updateTeam }
