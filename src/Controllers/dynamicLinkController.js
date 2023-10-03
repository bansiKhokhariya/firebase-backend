const DynamicLink = require("../Models/DynamicLinkSchema");
const constant = require("../Utils/Constant/constant");
const { schemaErrorResponse } = require("../Utils/Error/schemaError");
const handleErrorResponse = require("../Utils/Error/handleErrorResponse");
const { dynamicLinkBodySchema } = require("../Utils/validation/BodySchema");

const getLink = async (req, res) => {
    try {
        const query = req.query.id ? { _id: req.query.id } : {};
        const dynamicLink = await DynamicLink.find(query).select(
            "-createdAt -updatedAt -__v "
        );
        res.send(dynamicLink);
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

const createLink = async (req, res) => {
    try {
        const { value, error: validationError } = dynamicLinkBodySchema.validate(
            req.body,
            {
                abortEarly: false,
                errors: { wrap: { label: '"' } },
            }
        );
        if (validationError) {
            return schemaErrorResponse({ res, error: validationError });
        }

        const linkData = {
            name: value.name,
            link: value.link,
            image: value.image,
        };

        await DynamicLink.create(linkData);
        res
            .status(200)
            .json({ message: constant.SUCCESS_MESSAGE.DATA_SAVE });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

const updateLink = async (req, res) => {
    try {
        const { value, error: validationError } = dynamicLinkBodySchema.validate(
            req.body,
            {
                abortEarly: false,
            }
        );
        if (validationError) {
            return schemaErrorResponse({ res, error: validationError });
        }

        const linkData = {
            name: value.name,
            link: value.link,
            image: value.image,
        };

        await DynamicLink.updateOne({ _id: req.query.id }, linkData);

        res
            .status(200)
            .json({ message: constant.SUCCESS_MESSAGE.DATA_UPDATE });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

const deleteLink = async (req, res) => {
    try {
        await DynamicLink.findByIdAndDelete(req.query.id);
        res
            .status(200)
            .json({ message: constant.SUCCESS_MESSAGE.DATA_DELETE });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

module.exports = { getLink, createLink, updateLink, deleteLink };