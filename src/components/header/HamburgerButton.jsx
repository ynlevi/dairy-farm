import { RxHamburgerMenu } from "react-icons/rx";
export default function HamburgerButton({ setOpen }) {
  return (
    <button onClick={() => setOpen((prev) => !prev)} className="lg:hidden">
      {<RxHamburgerMenu size={22} className="" />}
    </button>
  );
}
