import Image from "next/image";
import React from "react";
import monySaving from "@/../public/svg/mony-saving.svg";
import { FaRegCheckCircle } from "react-icons/fa";
export default function page() {
  return (
    <div>
      <div className="lg:mt-5 gap-5 flex flex-col lg:flex-row  justify-between">
        <Image
          className="w-full lg:w-6/12 mx-auto"
          src={monySaving}
          alt="mony saving"
        />

        <div className="my-auto lg:max-w-md">
          <h3 className="header-4xl">Simple, Straightforward, Rewarding.</h3>
          <h3 className="text-xl mt-2">
            Purchase $140 worth of credit and get $150 in your account.
          </h3>
        </div>
      </div>
      <h1 className="header-2xl mt-10 normal-case text-center">
        Wellcome to our Loyalty Program.
      </h1>

      <div className="max-w-lg mx-auto bg-white text-black p-6 lg:p-10 mt-10">
        <h3 className="text-xl font-bold">Your Money Worth More.</h3>
        <ul className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex ">
              <FaRegCheckCircle className="text-yellow-500 text-md aspect-square mt-1 absolute" />
              <p className="ml-5">{feature}</p>
            </li>
          ))}
        </ul>

        <h3 className="bg-yellow-500 mt-10 text-white py-2 text-center text-xl font-bold">
          Pay Only $140
        </h3>
      </div>
    </div>
  );
}

const features = [
  "Purchase $150 worth of credit and use it on any items in our store.",
  "Your credit is vaild for 4 years.",
  "Double promotions are available.",
  "The credit available only on your online porchases (including pickups).",
];
