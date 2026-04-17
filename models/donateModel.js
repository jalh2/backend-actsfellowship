const { db } = require('../config')

const collection = db.collection('donateContent')
const DOC_ID = 'main'

const defaults = {
  title: 'Donate',
  description: 'Your generous donation helps us train church leaders across Africa.',
  donationOptions: [
    { amount: 25, description: 'Supports training materials for one leader' },
    { amount: 50, description: 'Provides meals during training sessions' },
    { amount: 100, description: 'Funds travel for a facilitator' },
    { amount: 250, description: 'Sponsors a complete training module' }
  ],
  paymentMethods: {
    bankTransfer: {
      bankName: '',
      accountName: '',
      accountNumber: '',
      swiftCode: '',
      routingNumber: ''
    },
    mobileMoney: {
      provider: '',
      number: ''
    },
    paypal: '',
    other: ''
  },
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
