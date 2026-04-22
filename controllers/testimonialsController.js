const TestimonialsModel = require('../models/testimonialsModel')

const getTestimonials = async (req, res) => {
  try {
    const doc = await TestimonialsModel.findOne()
    if (!doc) return res.json(TestimonialsModel.defaults)
    res.json(doc)
  } catch (e) {
    console.error('getTestimonials error:', e)
    res.status(500).json({ message: 'Server error', error: e.message })
  }
}

const updateTestimonials = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.items !== undefined) {
      updateData.items = (Array.isArray(payload.items) ? payload.items : []).map((item) => ({
        name: item?.name || '',
        role: item?.role || '',
        location: item?.location || '',
        quote: item?.quote || '',
        image: item?.image || ''
      }))
    }

    const doc = await TestimonialsModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    console.error('updateTestimonials error:', e)
    res.status(500).json({ message: 'Server error', error: e.message })
  }
}

module.exports = { getTestimonials, updateTestimonials }
