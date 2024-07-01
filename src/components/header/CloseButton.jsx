import { GoX } from "react-icons/go";
export default function CloseButton({ setOpen }) {
  return (
    <button className="relative left-1" onClick={() => setOpen(false)}>
      <GoX className="text-white text-3xl " />
    </button>
  );
}
