import Image from "next/image";
import { getProductBySlug, getProductList } from "@/lib/swell/action";
import AddToCart from "@/components/AddToCart";
import PopularProducts from "@/components/PopularProducts ";
import { Carousel } from "@/components/Carousel";
export async function generateStaticParams() {
  const products = await getProductList();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Product({ params: { slug } }) {
  const product = await getProductBySlug(slug);

  const imageUrl = product.images[0].file.url;
  const { name, price, description } = product;

  return (
    <div>
      <div className="flex">
        {/* <Image src={imageUrl} alt={`${slug}-image`} width={500} height={500} /> */}
        <Carousel />
        <div className="">
          <h2 className="text-4xl font-thin">{name}</h2>
          <h3
            className="font-bold"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <span>{price.toFixed(2) + "$"}</span>
          <AddToCart item={product} />
        </div>
      </div>
      <div>
        <PopularProducts />
      </div>
    </div>
  );
}
