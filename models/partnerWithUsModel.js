const { db } = require('../config')

const collection = db.collection('partnerWithUsContent')
const DOC_ID = 'main'

const defaults = {
  title: 'Partner With Us',
  description: '',
  waysToPartner: [
    {
      title: 'Pray',
      description: 'Join us in prayer for the ministry and the leaders we train.',
      iconType: 'pray'
    },
    {
      title: 'Give',
      description: 'Your financial support helps us train more church leaders.',
      iconType: 'give'
    },
    {
      title: 'Volunteer',
      description: 'Share your skills and time to support our mission.',
      iconType: 'volunteer'
    }
  ],
  createdAt: null,
  updatedAt: null
}

const findOne = async () => {
  const doc = await collection.doc(DOC_ID).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

const upsert = async (data) => {
  const now = new Date().toISOString()
  const existing = await findOne()
  if (existing) {
    await collection.doc(DOC_ID).update({ ...data, updatedAt: now })
  } else {
    const docData = { ...defaults, ...data, createdAt: now, updatedAt: now }
    await collection.doc(DOC_ID).set(docData)
  }
  return findOne()
}

module.exports = { collection, defaults, findOne, upsert, DOC_ID }
