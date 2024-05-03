import { swell } from "./client";

export async function getProductList() {
  const productList = (await swell.products.list()).results;
  return productList;
}

export async function getProductBySlug(slug) {
  const product = await swell.products.get(slug);
  return product;
}
