import Product from "@/app/products/components/Product";

import { swell } from "@/lib/swell/client";

export default async function PopularProducts() {
  const popularProducts = await swell.products.list({
    category: "popular",
    limit: 100,
    page: 1,
  });

  return (
    <div className="mt-16">
      <h3 className="header-lg normal-case">
        Other products you may also like
      </h3>
      <div className="products-grid mt-5">
        {popularProducts.results.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
