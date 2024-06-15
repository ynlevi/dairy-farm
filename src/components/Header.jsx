import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <div className=" px-5 sm:px-20 lg:px-32 2xl:px-52 flex justify-between mx-auto bg-red-950 ">
      <Link href={"/"}>
        <h1>Header</h1>
      </Link>
      <CartButton />
    </div>
  );
}
