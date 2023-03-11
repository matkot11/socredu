import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import BookedLesson from "@/models/BookedLesson";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { id } = req.body;

  if (!id) {
    res.status(422).json({ message: "Couldn't remove booked lesson." });
    return;
  }

  await dbConnect();

  await BookedLesson.deleteOne({ _id: id });

  res.status(200).json({ message: "Successfully deleted lesson." });
};

export default handler;
