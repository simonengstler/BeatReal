const admin = require('firebase-admin');
const serviceAccount = require('./private/firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beatreal-de77c-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = admin.database();

module.exports = db;
