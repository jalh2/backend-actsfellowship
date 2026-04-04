const admin = require('firebase-admin')
const path = require('path')

const serviceAccountPath = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS || './actsfellowshipintl-service-account.json')
const serviceAccount = require(serviceAccountPath)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

console.log('Firebase Admin initialized, Firestore connected.')

module.exports = { admin, db }
