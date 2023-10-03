let constants = {
  SUCCESS_MESSAGE: {
    LOGIN: "The user has successfully logged in.",
    DATA_SAVE: "The data has been saved successfully",
    DATA_DELETE: "The data has been deleted successfully",
    DATA_UPDATE: "The data has been updated successfully"
  },
  ERROR_MESSAGE: {
    EMAIL_NOT_EXISTS_MESSAGE: "An email address with this name does not exist.",
    AUTHENTICATE: "Please Authenticate",
    JSON_FILE_REQUIRED: "JsonFile is required",
    JSON_FILE_ALLOWED: "Only JSON files are allowed"
  },
  VALIDATION: {
    EMAIL_INVALID_MESSAGE: "Email is invalid",
    PASSWORD_MESSAGE:
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
    CREDENTIAL_NOT_MATCH_MESSAGE: "The credentials do not match",
    INVALID_TOKEN_MESSAGE: "This token is not valid.",
    PASSWORD_NOT_MATCH_MESSAGE:
      "You can generate a new password using the forgot password option.",
  },
};

module.exports = Object.freeze(constants);
