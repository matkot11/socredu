import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import BookedLesson from "@/models/BookedLesson";
import User from "@/models/User";
import Teacher from "@/models/Teacher";
import { setHours } from "date-fns";
import { Types } from "mongoose";

interface Data {
  message: string;
  paymentId?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { teacherId, studentEmail, date, time, about, price } = req.body;

  if (!studentEmail) {
    res.status(422).json({ message: "Not authenticated." });
    return;
  }

  if (!date || !time || !about) {
    res.status(422).json({ message: "Please fill every input." });
    return;
  }

  await dbConnect();

  const student = await User.findOne({ email: studentEmail });

  const teacher = await Teacher.findOne({
    _id: new Types.ObjectId(teacherId),
  });

  const id = new Types.ObjectId();
  await BookedLesson.create({
    _id: id,
    student: student._id,
    teacher: teacher._id,
    when: setHours(new Date(date), time),
    about,
    price
  });

  if (teacher.bookedLessons === undefined) {
    teacher.bookedLessons = [id];
  } else {
    teacher.bookedLessons.push(id);
  }
  await teacher.save();

  res
    .status(200)
    .json({ message: "Successfully booked lesson.", paymentId: id.toString() });
};

export default handler;
