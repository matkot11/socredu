import cloudinary from "cloudinary";

export const uploadImage = async (res, image, imageId) => {
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
    res.status(404).json({ message: "Profile image could not be uploaded." });
  }

  return { imageURL };
};
