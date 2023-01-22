const { config } = require("dotenv");
config();
const cloudinary = require("cloudinary");
const cloud = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

module.exports = {
  cloud,
  cloudinary,
};
