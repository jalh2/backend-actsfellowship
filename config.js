const admin = require('firebase-admin')
const path = require('path')

//Local development - uncomment these lines for local mode:
// const serviceAccountPath = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS || './actsfellowshipintl-service-account.json')
// const serviceAccount = require(serviceAccountPath)

// Production - uses environment variable:
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

console.log('Firebase Admin initialized, Firestore connected.')

module.exports = { admin, db }
