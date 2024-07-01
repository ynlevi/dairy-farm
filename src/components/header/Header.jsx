"use client";
import Link from "next/link";
import AccountDisplay from "./AccountDisplay";
import { usePathname } from "next/navigation";
import Cart from "../cart/Cart";
import Menu from "./Menu";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 bg-black layout flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-xs font-serif capitalize font-thin w-fit my-auto">
          our glorious bakery
        </h1>
      </Link>
      <nav className="hidden lg:flex gap-1 text-purple-300">
        {nav.map((item) => (
          <Link href={item.href} key={item.name} className="capitalize">
            <div
              className={`tracking-wide py-2 px-2 hover:bg-purple-400  hover:text-white ${
                pathname === item.href &&
                "underline underline-offset-4 font-extrabold decoration-2"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
      <div className="flex gap-4">
        <AccountDisplay />
        <Cart />
        <Menu pathname={pathname} nav={nav} />
      </div>
    </div>
  );
}
export const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Order Online", href: "/products" },
  { name: "Loyalty Program", href: "/loyalty-program" },
];
