const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("./src/routes/index");
const { config } = require("./src/Config/env");

const main = async () => {
  try {
    config();
    const app = express();

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());


    app.use(routes);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log({ Error: error.message });
  }
};

main().then();
