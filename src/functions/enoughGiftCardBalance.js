import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";

export default function enoughGiftCardBalance() {
  const { cart } = useContext(CartContext);
  return cart?.giftcardTotal >= cart?.grandTotal;
}
