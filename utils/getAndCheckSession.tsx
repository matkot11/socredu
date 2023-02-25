import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export const getAndCheckSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(404).json({ message: "Not authenticated." });
    return;
  }
  return session;
};
