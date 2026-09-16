import { Text } from "@mantine/core";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/api";

export function CartSummary() {
    const {totalItems, totalPrice} = useCart();
    return (
        <div>
            <Text>Totalt: {totalItems} produkter</Text>
            <Text fw={700} size="lg">{formatPrice(totalPrice)}</Text>
        </div>
    );
}