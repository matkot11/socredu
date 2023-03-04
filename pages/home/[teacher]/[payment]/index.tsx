import styles from "@/views/payment/payment.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";
import dbConnect from "@/utils/dbConnect";
import BookedLesson from "@/models/BookedLesson";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import Checkout from "@/views/payment/components/checkout/Checkout";

interface PaymentProps {
  payment: {
    id: string;
    when: Date;
    about: string;
    price: number;
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const Payment = ({ payment }: PaymentProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { dispatchError } = useError();

  useEffect(() => {
    const paymentRequest = async () => {
      try {
        const response = await axios.post("/api/bookLesson/payment", {
          price: payment.price,
        });

        setClientSecret(response.data.clientSecret);
      } catch (error: any) {
        dispatchError(error.response.data.message);
      }
    };

    paymentRequest();
  }, []);

  if (!payment) return;

  const getDate = () => format(new Date(payment.when), "P");
  const getTime = () => format(new Date(payment.when), "p");

  const stripeOptions = {
    clientSecret,
    appearance: {
      variables: {
        colorPrimary: "#6459eb",
        fontFamily: "Montserrat, sans-serif",
        borderRadius: "25px",
        fontSizeBase: "14px",
      },
    },
  };

  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <h3 className={styles.header}>Lesson summary</h3>
          <div className={styles.scheduleWrapper}>
            <div className={styles.dateWrapper}>
              <span className={styles.dateHeader}>Date</span>
              <span className={styles.time}>{getDate()}</span>
            </div>
            <div className={styles.dateWrapper}>
              <span className={styles.dateHeader}>Time</span>
              <span className={styles.time}>{getTime()}</span>
            </div>
          </div>
          <h4 className={styles.subHeader}>Lesson description</h4>
          <p className={styles.about}>{payment.about}</p>
        </div>
        <div className={styles.rightWrapper}>
          <h3 className={styles.header}>Card information</h3>
          <span className={styles.info}>
            Indicate details of the card from which money will be debited
          </span>
          {clientSecret && (
            <Elements options={stripeOptions} stripe={stripePromise}>
              <Checkout />
            </Elements>
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const bookedLessons = await BookedLesson.find();

  return {
    paths: bookedLessons.map((lesson) => ({
      params: {
        teacher: lesson.teacher.toString(),
        payment: lesson._id.toString(),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paymentId = params?.payment;

  await dbConnect();
  const bookedLesson = await BookedLesson.findOne({ _id: paymentId });

  return {
    props: {
      payment: {
        id: bookedLesson._id.toString(),
        when: bookedLesson.when.toString(),
        about: bookedLesson.about,
        price: bookedLesson.price,
      },
    },
  };
};

export default Payment;
