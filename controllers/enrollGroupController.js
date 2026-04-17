const EnrollGroupModel = require('../models/enrollGroupModel')

const getSubmissions = async (req, res) => {
  try {
    const submissions = await EnrollGroupModel.findAll()
    res.json(submissions)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const createSubmission = async (req, res) => {
  try {
    const payload = req.body
    const submission = await EnrollGroupModel.create(payload)
    res.status(201).json(submission)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const submission = await EnrollGroupModel.updateStatus(id, status)
    res.json(submission)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params
    await EnrollGroupModel.deleteSubmission(id)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getSubmissions, createSubmission, updateSubmissionStatus, deleteSubmission }
