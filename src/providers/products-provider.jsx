"use client";
import { createContext, useEffect, useState } from "react";

import { swell } from "@/lib/swell/client";

export const ProductsContext = createContext();
export function ProductsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryActive, setCategoryActive] = useState(null);
  useEffect(() => {
    async function getCategories() {
      const categories = await swell.categories.list();
      const products = await swell.products.list({
        limit: 100,
        expand: "categories",
      });

      const temp = [];
      categories.results.map((category, i) => {
        if (category.slug === "popular") return;
        //find all the right produts for this category:
        const productsOfCategory = products.results.filter(
          (product) => product.categories[0]?.name === category.name
        );
        temp.push({
          id: i,
          name: category.name,
          slug: category.slug,
          products: productsOfCategory,
        });
      });
      setProducts(temp);
      setIsLoading(false);
    }
    console.log("products", products);
    getCategories();
  }, [isLoading]);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, categoryActive, setCategoryActive }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
