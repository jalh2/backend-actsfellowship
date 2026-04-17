const { db } = require('../config')

const collection = db.collection('enrollGroupSubmissions')

const defaults = {
  groupName: '',
  groupSize: '',
  leaderName: '',
  leaderEmail: '',
  leaderPhone: '',
  country: '',
  city: '',
  churchAffiliation: '',
  message: '',
  status: 'pending',
  createdAt: null
}

const findAll = async () => {
  const snapshot = await collection.orderBy('createdAt', 'desc').get()
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const create = async (data) => {
  const now = new Date().toISOString()
  const docRef = collection.doc()
  const docData = { ...defaults, ...data, createdAt: now }
  await docRef.set(docData)
  return { id: docRef.id, ...docData }
}

const updateStatus = async (id, status) => {
  const now = new Date().toISOString()
  await collection.doc(id).update({ status, updatedAt: now })
  const doc = await collection.doc(id).get()
  return { id: doc.id, ...doc.data() }
}

const deleteSubmission = async (id) => {
  await collection.doc(id).delete()
  return { success: true }
}

module.exports = { collection, defaults, findAll, create, updateStatus, deleteSubmission }
