import { getProductBySlug, getProductList } from "@/lib/swell/action";
import PopularProducts from "@/components/PopularProducts ";
import QuntitySelecter from "./components/QuntitySelecter";
import { Carousel } from "./components/Carousel";
import { redirect } from "next/dist/server/api-utils";

// export async function generateStaticParams() {
//   const products = await getProductList();
//   console.log(products, "producttttttttttt");
//   return products.map((product) => ({ slug: product.slug }));
// }

export default async function Product({ params: { slug } }) {
  const product = await getProductBySlug(slug);

  const { images } = product;

  const { name, price, description, options } = product;

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between ">
        <Carousel images={images} />
        <div className=" my-auto pb-20 xs:pb-24 sm:pb-28 lg:pb-0 lg:w-1/2">
          <div className="font-thin flex flex-col">
            <h2 className="text-4xl first-letter:-ml-1">{name}</h2>
            <p className="text-xl mt-2">{`$${price.toFixed(2)}`}</p>
            <h3 className="mt-1">{description}</h3>
            <QuntitySelecter id={product.id} price={price} options={options} />
          </div>
        </div>
      </div>
      <div>
        <PopularProducts />
      </div>
    </div>
  );
}
