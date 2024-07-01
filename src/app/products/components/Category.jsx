"use client";
import Product from "./Product";
import { forwardRef, useRef } from "react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { useContext } from "react";
import { ProductsContext } from "@/providers/products-provider";

const Category = forwardRef(({ category }, ref) => {
  {
    return (
      <div className="scroll-mt-20" ref={ref}>
        <Products category={category} />
      </div>
    );
  }
});
export default Category;

const Products = ({ category: { slug, name, products } }) => {
  const { categoryActive, setCategoryActive } = useContext(ProductsContext);
  const productRef = useRef();
  const { scrollYProgress } = useScroll({
    target: productRef,
    offset: ["start end", "start start"],
  });

  //make category active when scroll is near the top
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.87 && latest < 0.9 && categoryActive !== slug) {
      setCategoryActive(slug);
    }
  });

  return (
    <motion.div ref={productRef} className="mb-10">
      <h3 className="header-xl">{name}</h3>
      <div className="products-grid mt-5">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};
