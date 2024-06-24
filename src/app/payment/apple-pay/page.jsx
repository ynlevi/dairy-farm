import React, { useEffect } from "react";
import { swell } from "@/lib/swell/client";
export default async function page() {
  await swell.payment.createElements({
    apple: {
      require: {
        // Requested data in Apple Pay modal
        shipping: false, // Default: false
        name: true, // Default: false
        email: true, // Default: false
        phone: false, // Default: false
      },
      classes: {
        base: "<button-container-class>", // Optional, the base class applied to the container
        // The following classes only work with Stripe Apple Pay
        complete: "<button-complete-class>", // Optional, the class name to apply when the Element is complete
        empty: "<button-empty-class>", // Optional, the class name to apply when the Element is empty
        focus: "<button-focus-class>", // Optional, the class name to apply when the Element is focused
        invalid: "<button-invalid-class>", // Optional, the class name to apply when the Element is invalid
        webkitAutofill: "<button-webkit-autofill-class>", // Optional, the class name to apply when the Element has its value autofilled by the browser (only on Chrome and Safari)
      },
      onSuccess: () => {}, // Optional, called on submit Apple Pay modal
      onError: (error) => {}, // Optional, called on payment error
    },
  });

  return (
    <div className="   p-4 ">
      <div id="applepay-button"></div>
      {/* <button onClick={submitPayment}>Pay Now</button> */}
    </div>
  );
}
