import { Title } from "@mantine/core";
import { CartList } from "../components/cart/CartList";
import { CartSummary } from "../components/cart/CartSummary";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "../components/Checkout/CheckoutForm";
import { createOrder } from "../lib/api";



export function Checkout() {
  const {items, clearCart} = useCart();
  const navigate = useNavigate();

  if(items.length === 0){
    return(
      <div>
        <Title order={1}>Tomt här,lägg till produkter!</Title>
        <a href="/">Gå till startsidan</a>
      </div>
    );
  }

const handleCheckoutSubmit = async (formData:any) =>
{
  const order = await createOrder({
    items: items.map(i => ({productId: i.product.id, quantity: i.quantity})),
    customer: formData,
  });
  clearCart ();
  navigate(`/confirmation/${order.orderNumber}`, {replace: true});
}

  return (
    <div>
      <Title order={1}>Kassa</Title>
      <div style={{display: "flex", gap: "2rem"}}>
        <div style={{flex: 1}}>
          <CartList/>
          <CartSummary/>
        </div>
        <div style={{flex: 1}}>
        <CheckoutForm onSubmit={handleCheckoutSubmit}/>
        </div>
      </div>
    </div>
  );
}
