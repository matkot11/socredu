import styles from "@/views/payment/paymentSuccessful.module.scss";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import SuccessIllustration from "@/assets/illustrations/success-illustration.svg";
import Image from "next/image";
import PrimaryLink from "@/components/primaryLink/PrimaryLink";

const PaymentSuccessful = () => {
  const router = useRouter();
  const { dispatchError } = useError();

  useEffect(() => {
    const response = async () => {
      if (router.query.payment) {
        try {
          await axios.post("/api/bookLesson/confirmPayment", {
            response: true,
            id: router.query.payment,
          });
        } catch (error: any) {
          dispatchError(error.response.data.message);
        }
      }
    };

    response();
  }, [router.query]);
  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <Image
          className={styles.image}
          src={SuccessIllustration}
          alt="Success illustration"
        />
        <div className={styles.rightWrapper}>
          <h3 className={styles.header}>SUCCESS!</h3>
          <p className={styles.subHeader}>
            You can now check your booked lesson on your lesson panel.
          </p>
          <PrimaryLink text="Back to Socredu" href="/home" />
        </div>
      </div>
    </MainTemplate>
  );
};

export default PaymentSuccessful;
