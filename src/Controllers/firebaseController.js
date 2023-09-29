const admin = require("firebase-admin");
const axios = require("axios");
const FirebaseAccountSchema = require("../Models/FirebaseAccountSchema");

const firebaseApps = {}; // Store Firebase app instances

// Initialize a Firebase app with the provided service account
async function initializeFirebaseApp(serviceAccountJsonObject, appName) {
  if (!firebaseApps[appName]) {
    // Initialize Firebase with the new service account credentials
    firebaseApps[appName] = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccountJsonObject),
      },
      appName
    );
    console.log(`Firebase app '${appName}' initialized`);
  }
}

async function getServiceAccountObject(id) {
  const getAppConfigure = await FirebaseAccountSchema.findOne({ _id: id }).select("-createdAt -updatedAt -__v");
  return {
    type: getAppConfigure.type,
    project_id: getAppConfigure.project_id,
    private_key_id: getAppConfigure.private_key_id,
    private_key: getAppConfigure.private_key,
    client_email: getAppConfigure.client_email,
    client_id: getAppConfigure.client_id,
    auth_uri: getAppConfigure.auth_uri,
    token_uri: getAppConfigure.token_uri,
    auth_provider_x509_cert_url: getAppConfigure.auth_provider_x509_cert_url,
    client_x509_cert_url: getAppConfigure.client_x509_cert_url,
    universe_domain: getAppConfigure.universe_domain
  };
}

// Get or initialize Firebase app instance
async function getFirebaseApp(serviceAccountJsonObject, appName) {
  if (!firebaseApps[appName]) {
    await initializeFirebaseApp(serviceAccountJsonObject, appName);
  }
  return firebaseApps[appName];
}

// Function to get access token
async function getAccessToken(serviceAccountJsonObject, appName) {
  try {
    const firebaseApp = await getFirebaseApp(serviceAccountJsonObject, appName);
    const response = await firebaseApp.options_.credential.getAccessToken();
    return response.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

async function setRemoteConfig(req, res) {
  try {
    const serviceAccountJsonObject = await getServiceAccountObject(req.query.id);
    const appName = serviceAccountJsonObject.project_id; // Define an app name

    // Initialize or reinitialize Firebase with the new service account
    await initializeFirebaseApp(serviceAccountJsonObject, appName);

    const accessToken = await getAccessToken(serviceAccountJsonObject, appName);
    const url = `https://firebaseremoteconfig.googleapis.com/v1/projects/${serviceAccountJsonObject.project_id}/remoteConfig`;

    const templateResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const template = templateResponse.data;

    // Assuming req.body contains an object of items, not an array
    for (const key in req.body) {
      if (template.parameters[key]) {
        template.parameters[key].defaultValue.value = req.body[key];
      }
    }

    const updateResponse = await axios.put(url, template, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "If-Match": templateResponse.headers.etag,
        "Content-Type": "application/json; UTF8",
      },
    });

    res.send(updateResponse.data);
  } catch (error) {
    res.send(error.message);
    console.error("Error updating Remote Config template:", error);
  }
}

async function getRemoteConfig(req, res) {
  try {
    const serviceAccountJsonObject = await getServiceAccountObject(req.query.id);
    const appName = serviceAccountJsonObject.project_id; // Define an app name

    // Initialize or reinitialize Firebase with the new service account
    await initializeFirebaseApp(serviceAccountJsonObject, appName);

    const accessToken = await getAccessToken(serviceAccountJsonObject, appName);
    const url = `https://firebaseremoteconfig.googleapis.com/v1/projects/${serviceAccountJsonObject.project_id}/remoteConfig`;

    const templateResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = templateResponse.data.parameters;
    res.json({ data });
  } catch (error) {
    res.send(error);
    console.error("Error updating Remote Config template:", error);
  }
}

module.exports = {
  getRemoteConfig,
  setRemoteConfig,
};

