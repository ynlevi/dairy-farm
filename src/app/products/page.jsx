"use client";
import { useEffect, useRef, useContext } from "react";
import Loading from "../loading";
import Category from "./components/Category";
import { ProductsContext } from "@/providers/products-provider";

export default function Page() {
  const { products, isLoading, categoryActive, setCategoryActive } =
    useContext(ProductsContext);
  const categoryRefs = useRef([]);

  useEffect(() => {
    if (products[0]) {
      setCategoryActive(products[0]?.slug);
    }
  }, [products]);

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, products.length);
  }, [products]);

  function scrollItUp(index) {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="header-2xl">Products</h1>
      <div className="flex mt-10 lg:mt-20">
        <div className="hidden md:block sticky mr-20 h-fit top-20 left-0">
          <h3 className="text-2xl font-thin">Categories</h3>
          <div className="mt-5 flex gap-6 flex-col items-start">
            {products?.map((category, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollItUp(i);
                }}
              >
                <h3
                  className={`${
                    categoryActive === category.slug ? "text-purple-400" : ""
                  } text-xl capitalize font-bold tracking-wide cursor-pointer`}
                >
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full">
          {products?.map((category, i) => (
            <Category
              key={category.id}
              category={category}
              ref={(el) => (categoryRefs.current[i] = el)}
            />
          ))}
        </div>

        {/* <PopularProducts /> */}
      </div>
      <div className="h-[50vh] w-full"></div>
    </div>
  );
}
