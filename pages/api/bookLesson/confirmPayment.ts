import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import BookedLesson from "@/models/BookedLesson";
import { Types } from "mongoose";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { response, id } = req.body;

  await dbConnect();
  const bookedLesson = await BookedLesson.findOne({
    _id: new Types.ObjectId(id),
  });
  bookedLesson.paid = response;
  await bookedLesson.save();

  res.status(201).json({ message: "Payment proceeded." });
};

export default handler;
