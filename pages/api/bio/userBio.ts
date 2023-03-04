import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import { uploadImage } from "@/utils/uploadImage";
import User from "@/models/User";
import Student from "@/models/Student";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { email, name, image, about, deleteImage } = req.body;

  if (!email) {
    res.status(422).json({ message: "Not authenticated." });
    return;
  }

  if (!name && !image && !about && !deleteImage) {
    res.status(422).json({ message: "Nothing has been changed." });
    return;
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (name && user.name !== name) {
    user.name = name;
    await user.save();
  }

  let imageUrl: string;
  if (image) {
    const { imageURL } = await uploadImage(res, image, user._id.toString());

    user.image = imageURL;
    await user.save();
  }

  if (deleteImage) {
    user.image =
      "https://res.cloudinary.com/dlyqh2gvy/image/upload/v1676912589/default_mjfaai.svg";
    await user.save();
  }

  const student = await Student.findOne({ user: user._id });
  if (about.length > 1 && student.about !== about) {
    student.about = about;
    await student.save();
  }

  res.status(200).json({ message: "Successfully updated BIO." });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default handler;
