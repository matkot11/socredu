import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/passwordVerification";
import User from "@/models/User";
import Student from "@/models/Student";
import { Types } from "mongoose";
import Teacher from "@/models/Teacher";
import { week } from "@/data/week";

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password, repeatPassword } = req.body;

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
  const id = new Types.ObjectId();
  await User.create({
    _id: id,
    name,
    email,
    password: hashedPassword,
    image:
      "https://res.cloudinary.com/dlyqh2gvy/image/upload/v1676912589/default_mjfaai.svg",
  });

  await Student.create({
    user: id,
    about: "",
  });

  await Teacher.create({
    user: id,
    about: "",
    rating: [],
    categories: [],
    topics: [],
    price: "",
    days: week.map((day) => ({
      day: day,
      available: true,
      from: "7:00",
      to: "22:00",
    })),
    bookedLessons: [],
  });

  res.status(200).json({ message: "Successfully registered" });
};

export default handler;
