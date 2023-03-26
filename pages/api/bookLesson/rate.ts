import { NextApiRequest, NextApiResponse } from "next";
import Teacher from "@/models/Teacher";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { rate, teacherId } = req.body;

  if (!rate) {
    res.status(400).json({
      message: "Rate is required.",
    });
  }

  if (!teacherId) {
    res.status(400).json({
      message: "Something went wrong.",
    });
  }

  const teacher = await Teacher.findOne({ _id: teacherId });

  if (!teacher.rating) {
    teacher.rating = [rate];
  } else {
    teacher.rating.push(rate);
  }
  await teacher.save();

  res.status(200).json({
    message: "Rated successfully.",
  });
};

export default handler;
