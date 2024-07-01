"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Product({ product: { name, images, price, slug } }) {
  const imageRef = useRef(null);
  const imageUrl = images[0].file.url;
  const [isHover, setIsHover] = useState(false);

  return (
    <Link href={`/products/${slug}`}>
      <motion.div
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        className="bg-[#FFF4A3]  text-black "
      >
        <div className="relative pt-5 pb-10 ">
          <h4 className="capitalize text-lg absolute z-[1] px-5">
            <span className="bg-[#FFF4A3]">{name}</span>
          </h4>
        </div>
        <div className="flex justify-between items-center ">
          <div className="pl-5">
            {price && (
              <p className="font-bold text-sm  ">${price?.toFixed(2)}</p>
            )}
            <p className="text-sm bg-purple-300 px-2 rounded-md text-center py-1">
              Add
            </p>
          </div>
          <div
            className={`${
              isHover ? "border-purple-400" : "border-[#FFF4A3] "
            } duration-200 overflow-hidden relative w-7/12 aspect-[4/3] rounded-tl-[66px] lg:border-t-4 lg:border-l-4 `}
          >
            <Image
              src={imageUrl}
              fill={true}
              alt={slug}
              ref={imageRef}
              sizes="10rem"
              className={`${
                isHover ? " scale-110" : "scale-100 "
              } duration-200 object-cover rounded-tl-[62px] `}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
