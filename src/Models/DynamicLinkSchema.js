const mongoose = require("mongoose");

const DynamicLinkSchema = new mongoose.Schema(
    {
        name: String,
        link: String,
        image: String,
    },
    { timestamps: true }
);

const dynamicLink = mongoose.model(
    "DynamicLink",
    DynamicLinkSchema
);

module.exports = dynamicLink;
