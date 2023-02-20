import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/passwordVerification";
import User from "@/models/User";

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, age, email, password, repeatPassword } = req.body;

  if (!email || !email.includes("@")) {
    res.status(422).json({ message: "Invalid email address." });
    return;
  }
  await dbConnect();
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({ message: "User already exists." });
    return;
  }

  if (!age || age < 6) {
    res.status(422).json({
      message: "In order to use Socredu you need to be at least 6 years old.",
    });
    return;
  }

  if (!password || password.trim().length < 6) {
    res
      .status(422)
      .json({ message: "Password has to be at least 6 characters long." });
    return;
  }

  if (password !== repeatPassword) {
    res.status(422).json({ message: "Passwords do not match." });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    age,
    email,
    password: hashedPassword,
    image:
      "https://res.cloudinary.com/dlyqh2gvy/image/upload/v1676912589/default_mjfaai.svg",
  });

  res.status(200).json({ message: "Successfully registered" });
};

export default handler;
