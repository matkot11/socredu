import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Data {
  clientSecret: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return;

  const { price } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).json({
    clientSecret: payment.client_secret,
  });
};

export default handler;
