"use client";
import HamburgerButton from "./HamburgerButton";
import { useState } from "react";
import CloseButton from "./CloseButton";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Menu({ nav, pathname }) {
  const [open, setOpen] = useState(false);

  const varients = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <>
      <HamburgerButton setOpen={setOpen} />

      <motion.div
        variants={varients}
        animate={open ? "open" : "closed"}
        initial="closed"
        className="px-4 py-5 z-10 overflow-hidden inset-0 absolute w-screen h-screen text-white bg-black"
      >
        <div className="flex justify-between">
          <p className="header-xl">Menu</p>
          <CloseButton setOpen={setOpen} />
        </div>
        <ul className="text-xl flex gap-3 flex-col mt-10 mx-auto  w-fit max-w-[70%] text-purple-300">
          {nav.map((item) => (
            <li className="my-2" key={item.href}>
              <Link
                className={` ${
                  pathname === item.href &&
                  "underline underline-offset-4 decoration-2 font-bold"
                }`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
