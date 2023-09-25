const mongoose = require("mongoose");

const FirebaseAccountSchema = new mongoose.Schema(
  {
    appName: String,
    packageName: String,
    type: String,
    project_id: String,
    private_key_id: String,
    private_key: String,
    client_email: String,
    client_id: String,
    auth_uri: String,
    token_uri: String,
    auth_provider_x509_cert_url: String,
    client_x509_cert_url: String,
    universe_domain: String,
  },
  { timestamps: true }
);

const firebaseAccount = mongoose.model(
  "FirebaseAccount",
  FirebaseAccountSchema
);

module.exports = firebaseAccount;
