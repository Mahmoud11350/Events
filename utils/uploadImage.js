import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (req, res) => {
  if (!req.file) return;

  const result = await cloudinary.uploader.upload(
    req.files.imageUrl.tempFilePath,
    {
      use_filename: true,
      folder: "Evently",
      public_id: req.files.imageUrl.name,
    }
  );
  return res.send(result.secure_url);
};
