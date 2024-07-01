import Link from "next/link";
export default function ForgotButton() {
  return (
    <Link href="/account/recover" className="text-sm text-gray-300 underline">
      Forgot password?
    </Link>
  );
}
