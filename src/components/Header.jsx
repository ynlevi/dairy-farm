import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <div className="flex justify-between bg-red-950">
      <Link href={"/"}>
        <h1>Header</h1>
      </Link>
      <CartButton />
    </div>
  );
}
