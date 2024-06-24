"use client";
import React, { useEffect, useContext } from "react";
import { CartContext } from "@/provider/cart-provider";
import { swell } from "@/lib/swell/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function page() {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const [order, setOrder] = useState(null);
  let checkoutId;
  useEffect(() => {
    if (cart) {
      checkoutId = cart.checkoutId;
    }
  }, []);

  useEffect(() => {
    const initializePayment = async () => {
      await swell.payment.createElements({
        apple: {
          element_id: "applepay-button",
          style: {
            label: "Pay",
            theme: "light-outline",
            type: "default",

            height: "40px",
          },
          require: {
            // Requested data in Apple Pay modal
            shipping: false, // Default: false
            name: true, // Default: false
            email: true, // Default: false
            phone: false, // Default: false
          },
          // classes: {
          //   base: "<button-container-class>", // Optional, the base class applied to the container
          //   // The following classes only work with Stripe Apple Pay
          //   complete: "<button-complete-class>", // Optional, the class name to apply when the Element is complete
          //   empty: "<button-empty-class>", // Optional, the class name to apply when the Element is empty
          //   focus: "<button-focus-class>", // Optional, the class name to apply when the Element is focused
          //   invalid: "<button-invalid-class>", // Optional, the class name to apply when the Element is invalid
          //   webkitAutofill: "<button-webkit-autofill-class>", // Optional, the class name to apply when the Element has its value autofilled by the browser (only on Chrome and Safari)
          // },
          onSuccess: async () => {
            const o = await swell.cart.submitOrder();
            setOrder(o);
            // router.push(`/order/${checkoutId}`);
          },
          onError: (error) => {
            setOrder({ paid: false });
          }, // Optional, called on payment error
        },

        // google: {
        //   // locale: "<button-locale>", // Default: en
        //   // style: {
        //   //   color: "<button-color>", // Default: black
        //   //   type: "<button-type>", // Default: buy
        //   //   sizeMode: "<button-size-mode>", // Default: fill
        //   // },
        //   require: {
        //     // Requested data in Google Pay modal
        //     shipping: true, // Default: false
        //     email: true, // Default: false
        //     phone: true, // Default: false
        //   },
        //   classes: {
        //     base: "<button-container-class>", // Optional, the base class applied to the container
        //   },
        //   onSuccess: () => {}, // Optional, called on submit Google Pay modal
        //   onError: (error) => {}, // Optional, called on payment error
        // },
      });
    };

    initializePayment();
  }, []);
  return (
    <div className="">
      <div id="applepay-button-container" className="bg-blue-100">
        {/* <Link href={"/"}>
        <div className="p-4 bg-white  text-black align-text-bottom rounded-lg font-bold">
          Credit / Debit Card
        </div>
      </Link> */}
        <button id="applepay-button"></button>
        {/* <button
        id="googlepay-button"
        className="p-3 bg-white text-black align-text-bottom rounded-lg font-bold"
      >
        Google Pay
      </button> */}
      </div>
      {order && (
        <div className="">
          <h2>order</h2>
          {order.paid ? (
            <div className="">
              <h4>{`Thank you ${order.name}!`}</h4>
              <p>{`Order No. ${order.number} has successfuly complate`}</p>
            </div>
          ) : (
            <p className="text-red-500">
              we are apologize, there was a problem with your order. please give
              us a call
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ApplePayBtn
