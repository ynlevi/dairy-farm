import { swell } from "@/lib/swell/client";

export default async function page({ params: { slug } }) {
  const order = await swell.cart.getOrder(slug);
  console.log("the order is:", order);
  const {
    number,
    paid,
    account: { name, balance },
  } = order;
  console.log(order);
  return (
    <div className="">
      <h2>order</h2>
      <div className="">
        {paid ? (
          <div className="">
            <h4>{`Thank you ${name}!`}</h4>
            <p>{`Order No. ${number} has successfuly complate`}</p>
            <p>{`Your current balance is $${balance.toFixed(2)}`}</p>
          </div>
        ) : (
          <p className="text-red-500">
            we are apologize, there was a problem with your order. please give
            us a call
          </p>
        )}
      </div>
    </div>
  );
}
