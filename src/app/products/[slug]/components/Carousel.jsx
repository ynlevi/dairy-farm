"use client";
// 1. when user hover the display pic, I want it to scale up.

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  usePresence,
} from "framer-motion";
import { wrap } from "popmotion";
import "./carosul-style.css";
import Image from "next/image";
import ImageZoom from "@/components/ZoomImage";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
export function Carousel({ images }) {
  const [[page, direction], setPage] = useState([0, 0]);
  // console.log(images, "images");
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    // setPage([page + newDirection, newDirection]);
    setPage([page + newDirection, newDirection]);
  };
  const moveTo = (toIndex) => {
    const newDirection = toIndex - imageIndex;
    paginate(newDirection);
  };

  return (
    <>
      <div className=" flex flex-col-reverse lg:flex-row w-full gap-2">
        <div className={`my-2 flex lg:flex-col gap-2 lg:my-0`}>
          {images.map((image, i) => {
            return (
              <motion.button
                key={i}
                className="relative h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28 overflow-hidden "
                onClick={() => moveTo(i)}
                onHoverStart={() => moveTo(i)}
              >
                <Image
                  src={image.file.url}
                  alt={i}
                  fill
                  sizes="7rem"
                  placeholder="blur"
                  blurDataURL={image.file.url}
                  className={`absolute inset-0 object-cover ${
                    i === imageIndex &&
                    " outline-white -outline-offset-4 outline-[.1px] outline hoveropacity-70 opacity-60"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
        <div className="w-full lg:w-9/12">
          <div
            className={` overflow-hidden aspect-square relative w-full pt-[100%] before:absolute before:inset-0 before:h-full before:w-full before:z-[2] before:outline-white before:-outline-offset-[20px] before:outline-[1px] before:outline`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                className="inset-0 absolute text-white text-center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <Image
                  src={images[imageIndex].file.url}
                  alt="product-image"
                  placeholder="blur"
                  blurDataURL={images[imageIndex].file.url}
                  height={600}
                  width={600}
                  className="object-cover inset-0 absolute h-full w-full "
                />{" "}
              </motion.div>
            </AnimatePresence>
            <div className="next text-black " onClick={() => paginate(1)}>
              {"‣"}
            </div>
            <div className="prev text-black" onClick={() => paginate(-1)}>
              {"‣"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
