const admin = require('firebase-admin');
const serviceAccount = require('../service_accounts/development.json');

require('dotenv').config({ path: '.env' });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB
});

module.exports = admin;
