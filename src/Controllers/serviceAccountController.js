const FirebaseAccountSchema = require("../Models/FirebaseAccountSchema");
const { firebaseAccountBodySchema } = require("../Utils/validation/BodySchema");
const { schemaErrorResponse } = require("../Utils/Error/schemaError");
const handleErrorResponse = require("../Utils/Error/handleErrorResponse");
const constant = require("../Utils/Constant/constant");

const appConfigure = async (req, res) => {
  try {
    const { value, error } = firebaseAccountBodySchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return schemaErrorResponse({ res, error });
    }
    if (req.files) {
      const uploadedFile = req.files.jsonFile;

      if (uploadedFile.mimetype === "application/json") {

        // Check if a document with the same packageName already exists
        const existingAccount = await FirebaseAccountSchema.findOne({ packageName: value.packageName });

        if (existingAccount) {
          return res.status(400).json({
            requestBodyError: {
              packageName: 'Package name must be unique.',
            },
          });
        }

        const jsonData = JSON.parse(uploadedFile.data.toString("utf8"));
        const accountData = {
          appName: value.appName,
          packageName: value.packageName,
          type: jsonData.type,
          project_id: jsonData.project_id,
          private_key_id: jsonData.private_key_id,
          private_key: jsonData.private_key,
          client_email: jsonData.client_email,
          client_id: jsonData.client_id,
          auth_uri: jsonData.auth_uri,
          token_uri: jsonData.token_uri,
          auth_provider_x509_cert_url: jsonData.auth_provider_x509_cert_url,
          client_x509_cert_url: jsonData.client_x509_cert_url,
          universe_domain: jsonData.universe_domain,
        };

        await FirebaseAccountSchema.create(accountData);

        res.status(200).json({ message: constant.SUCCESS_MESSAGE.DATA_SAVE });
      } else {
        res.status(400).json({
          requestBodyError: {
            jsonFile: constant.ERROR_MESSAGE.JSON_FILE_ALLOWED,
          },
        });
      }
    } else {
      res.status(400).json({
        requestBodyError: {
          jsonFile: constant.ERROR_MESSAGE.JSON_FILE_REQUIRED,
        },
      });
    }
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

const getAppConfigure = async (req, res) => {
  try {
    const data = await FirebaseAccountSchema.find().select("appName packageName");
    res.json(data)
  } catch (err) {
    handleErrorResponse(res, err)
  }
}

const deleteApplication = async (req, res) => {
  try {
    await FirebaseAccountSchema.findByIdAndDelete({ _id: req.query.id });
    res.status(200).json({ message: constant.SUCCESS_MESSAGE.DATA_DELETE });
  } catch (err) {
    handleErrorResponse(res, err)
  }
}

module.exports = {
  appConfigure,
  getAppConfigure,
  deleteApplication
};
