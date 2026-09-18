import { Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder, formatPrice } from "../lib/api";
import type { Order } from "@shared/types";

export function Confirmation() {
  const {orderNumber} = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    getOrder(orderNumber!).then(data => setOrder(data));
  }, [orderNumber]);

  if (!order){
    return <Text>Laddar!</Text>
  }
  return (
    <div>
      <Title order={1}>Orderbekräftelse</Title>
      <Text size="x1" fw={700}>Ordernummer: {order.orderNumber}</Text>
      <Text>Datum: {order.createdAt}</Text>
      
      <Title order={2}>Produkter</Title>
      {order.items.map((item) => (
        <Text key={item.productId}>
          {item.title} x {item.quantity} = {formatPrice(item.price * item.quantity)}
        </Text>
      ))}
    
    
      <Text fw={700} size="lg">Totalt: {formatPrice(order.totalPrice)}</Text>
    
      <Title order={2}>Leveransuppgifter</Title>
      <Text>{order.customer.name}</Text>
      <Text>{order.customer.email}</Text>
      <Text>{order.customer.phone}</Text>
      <Text>{order.customer.street}</Text>
      <Text>{order.customer.zipCode} {order.customer.city}</Text>


      
    </div>
  );
}
