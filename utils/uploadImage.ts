import cloudinary from "cloudinary";
import { NextApiResponse } from "next";

export const uploadImage = async (
  res: NextApiResponse,
  image: string,
  imageId: string,
) => {
  let imageURL = "";
  try {
    const response = await cloudinary.v2.uploader.upload(image, {
      resource_type: "image",
      public_id: imageId,
      use_filename: true,
      filename_override: imageId,
    });

    imageURL = response.url;
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "Profile image could not be uploaded." });
  }

  return { imageURL };
};
