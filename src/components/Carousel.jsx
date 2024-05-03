"use client";
// 1. when user hover the display pic, I want it to scale up.

const images = [
  //   "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1559811814-e2c57b5e69df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1622808516114-02a5749cd965?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://cdn11.bigcommerce.com/s-7c08qbh/images/stencil/600x600/products/1190/10600/smoked-gouda-spread-2023__78312.1701981735.jpg?c=2",
  "https://cdn11.bigcommerce.com/s-7c08qbh/images/stencil/600x600/products/1190/10601/smoked-gouda-spreadb-2023__03441.1701981730.jpg?c=2",
  "https://cdn11.bigcommerce.com/s-7c08qbh/images/stencil/600x600/products/1190/2721/smoked-gouda-beer-spread2__66095.1610383144.jpg?c=2",
  "https://cdn11.bigcommerce.com/s-7c08qbh/images/stencil/600x600/products/1190/2721/smoked-gouda-beer-spread2__66095.1610383144.jpg?c=2",
];

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "./carosul-style.css";
import Image from "next/image";

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
    position: "static",
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
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
export function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageContainerRef = useRef(null);

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
      <div className="max-w-[600px]">
        <div
          ref={imageContainerRef}
          className="relative z-0 before:absolute before:inset-0 before:h-full before:w-full before:z-[1] before:outline-white before:-outline-offset-[20px] before:outline-[1px] before:outline "
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
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
                src={images[imageIndex]}
                alt="product-image"
                height={600}
                width={600}
                className="object-cover h-full w-full max-w-[600px] relative inset-0"
              />
            </motion.div>
          </AnimatePresence>
          <div className="next text-black " onClick={() => paginate(1)}>
            {"‣"}
          </div>
          <div className="prev text-black" onClick={() => paginate(-1)}>
            {"‣"}
          </div>
        </div>
        <div className={`my-2 flex gap-2`}>
          {images.map((image, i) => {
            return (
              <motion.button
                key={i}
                className=""
                onClick={() => moveTo(i)}
                onHoverStart={() => moveTo(i)}
              >
                <Image
                  src={image}
                  alt={i}
                  height={110}
                  width={110}
                  className={
                    i === imageIndex &&
                    " outline-white -outline-offset-4 outline-[.1px] outline relative hoveropacity-70"
                  }
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
