var admin = require("firebase-admin");
const axios = require("axios");
var serviceAccount = require("../../serviceAccount.json");
const { log } = require("firebase-functions/logger");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function getAccessToken() {
  try {
    const response = await admin.app().options_.credential.getAccessToken();
    const accessToken = response.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
}

const setRemoteConfig = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const url = `https://firebaseremoteconfig.googleapis.com/v1/projects/bansiapp-3ce8f/remoteConfig`;
    const templateResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const template = templateResponse.data;
    
    // Assuming req.body contains an array of items
    Object.keys(req.body).forEach((key) => {
      template.parameters[key].defaultValue.value = req.body[key];
    });

    const updateResponse = await axios.put(
      "https://firebaseremoteconfig.googleapis.com/v1/projects/bansiapp-3ce8f/remoteConfig",
      template,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "If-Match": templateResponse.headers.etag,
          "Content-Type": "application/json; UTF8",
        },
      }
    );
    res.send(updateResponse.data);
  } catch (error) {
    res.send(error.message);
    console.error("Error updating Remote Config template:", error);
  }
};

const getRemoteConfig = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const url = `https://firebaseremoteconfig.googleapis.com/v1/projects/bansiapp-3ce8f/remoteConfig`;
    const templateResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = templateResponse.data.parameters;
    res.json({ data: data });
  } catch (error) {
    res.send(error);
    console.error("Error updating Remote Config template:", error);
  }
};

module.exports = {
  getRemoteConfig,
  setRemoteConfig,
};
