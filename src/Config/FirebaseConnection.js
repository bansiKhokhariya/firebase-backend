var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccount.json");
const { config } = require("./env");
config();

const connectionFirebase = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.STORAGE_BUCKET,
    });
  } catch (err) {
    console.log("firebase app not initializeApp");
  }
};

module.exports = connectionFirebase;
