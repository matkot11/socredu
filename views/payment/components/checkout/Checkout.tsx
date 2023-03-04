import styles from "./checkout.module.scss";
import { useError } from "@/hooks/useError";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import PrimaryButton from "@/components/primaryLink/PrimaryButton";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { dispatchError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          dispatchError("Payment succeeded.");
          break;
        case "processing":
          dispatchError("Your payment is processing.");
          break;
        case "requires_payment_method":
          dispatchError("Your payment was not successful, please try again.");
          break;
        default:
          dispatchError("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const url = window.location.href + "/paymentSuccessful";
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: url,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      dispatchError(error.message || "Error has occurred.");
    } else {
      dispatchError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.paymentWrapper}>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>
      <PrimaryButton
        disabled={isLoading}
        type="submit"
        className={styles.button}
        text="Pay"
      />
    </form>
  );
};

export default Checkout;
