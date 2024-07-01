"use client";
import { swell } from "@/lib/swell/client";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
import { PaymentContext } from "@/providers/payment-provider";
import { useRouter } from "next/navigation";
import GiftCard from "./GiftCard";
import CreditCard from "./CreditCard";
import PromoCode from "./PromoCode";
import AccountCredit from "./AccountCredit";

export default function Payment() {
  const { paymentMethod, setPaymentMethod, balance } =
    useContext(PaymentContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(CartContext);
  const [message, setMessage] = useState({
    isError: false,
    text: "",
  });

  useEffect(() => {
    async function initializePayment() {
      await swell.payment.createElements({
        card: {
          elementId: "card-element",
          options: {
            hidePostalCode: true,
          },
        },
      });
      setLoading(false);
    }

    initializePayment();
  }, []);

  //check if there is a need to change the payment method.
  useEffect(() => {
    if (!balance) return;
    if (cart?.giftcardTotal >= cart?.grandTotal) {
      setPaymentMethod({
        withCreditCard: false,
        buttonText: "Pay with Gift Card",
      });
    } else if (balance) {
      /// check if there is enough account balance or only parttly
      if (balance >= cart?.grandTotal) {
        console.log("iside balance greater", balance);
        setPaymentMethod({
          withCreditCard: false,
          buttonText: "Pay with Account Credit",
        });
      } else {
        setPaymentMethod({
          withCreditCard: true,
          buttonText: "Pay Now",
        });
        setMessage({
          isError: false,
          text: `We'll use $${balance.toFixed(
            2
          )} from your Account Balance and charge $${(
            cart?.grandTotal - balance
          ).toFixed(2)} to your Credit Card.`,
        });
      }
    } else {
      setPaymentMethod({
        withCreditCard: true,
        buttonText: "Pay Now",
      });
    }
  }, [balance]);

  const tokenize = async (event) => {
    try {
      await swell.payment.tokenize({
        card: {
          onError: (err) => {
            // Inform the customer there was an error
            setMessage({
              isError: true,
              text: err.message,
            });
            setLoading(false);
          },
          onSuccess: async () => {
            setMessage({
              isError: false,
              text: null,
            });
            // Fire submit order
            try {
              await swell.cart.submitOrder();
              console.log("onSuccess");
              router.push(`/order/${cart.checkoutId}`);
            } catch (error) {
              console.log(
                "there is an error, probebly from the payment gateway",
                error
              );
            }
          },
        },
      });
    } catch (err) {
      setMessage({
        isError: true,
        text: err.message,
      });
      setLoading(false);
    }
  };

  const submitWithCreditCard = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    await tokenize();
  };

  const submitWithoutCreditCard = async () => {
    const order = await swell.cart.submitOrder();
    console.log("The order is:", order);
    router.push(`/order/${cart.checkoutId}`);
  };

  return (
    <div className="bg-white text-black  p-3 lg:w-1/2 flex flex-col gap-2">
      <h2 className="text-xl font-bold">Payment</h2>
      <GiftCard />
      <PromoCode />
      {cart?.accountLoggedIn && <AccountCredit />}
      <CreditCard />
      {message.text && (
        <div
          className={`text-sm ${
            message.isError ? "text-red-500" : "text-yellow-600"
          }`}
        >
          {message.text}
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={
          paymentMethod.withCreditCard
            ? submitWithCreditCard
            : submitWithoutCreditCard
        }
      >
        {loading ? "Processing..." : paymentMethod.buttonText}
      </button>
    </div>
  );
}
