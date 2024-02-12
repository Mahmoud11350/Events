import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.imageUrl.tempFilePath,
    {
      use_filename: true,
      folder: "Evently",
      public_id: req.files.imageUrl.name,
    }
  );
  await fs.unlinkSync(req.files.imageUrl.tempFilePath);
  return res.send(result.secure_url);
};
