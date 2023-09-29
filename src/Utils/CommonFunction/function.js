// const constant = require("../Constant/constant");
// const path = require("path");
// const firebaseStorageAdmin = require("firebase-admin");
// const connectionFirebase = require("../../Config/FirebaseConnection")
// const { config } = require("../../Config/env");
// config();

// connectionFirebase()

// const bucket = firebaseStorageAdmin.storage().bucket();


// const storeImageFirebase = async (uploadFile) => {
//   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//   const fileName = uniqueSuffix + path.extname(uploadFile.name);

//   try {
//     const fileData = uploadFile.data;
//     const file = bucket.file(fileName);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: uploadFile.mimetype,
//       },
//     });

//     stream.on("error", (error) => {
//       console.error("Error uploading file:", error);
//     });

//     stream.on("finish", () => {
//       console.log("File uploaded successfully.");
//     });

//     stream.end(fileData);

//     return fileName;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

// const getImageFirebase = async (fileName) => {
//   try {
//     const file = bucket.file(fileName);
//     const expiration = new Date().getTime() + 3600 * 1000; // 3600 seconds * 1000 milliseconds

//     // Get a signed URL for the file with a certain expiration time (e.g., 1 hour)
//     const [url] = await file.getSignedUrl({
//       action: "read",
//       expires: expiration,
//     });

//     return url;
//   } catch (err) {
//     console.error("Error getting file URL:", err);
//   }
// };

// module.exports = {
//   storeImageFirebase,
//   getImageFirebase,
// };
