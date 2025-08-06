import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const resource = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary::", resource);
    fs.unlinkSync(localFilePath)
    return resource;
  } catch (error) {
    console.error("Failed to upload:: ", error);
    fs.unlinkSync(localFilePath); //remove the local file from server as upload operation got failed.
  }
};

export { uploadOnCloudinary };
