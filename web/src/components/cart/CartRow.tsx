import { Image, Text, NumberInput, Button, Group } from "@mantine/core";
import { useCart } from "../../hooks/useCart";
import type { CartItem } from "@shared/types";
import { formatPrice } from "../../lib/api";

export function CartRow({item}: {item:CartItem}){
    const {updateQuantity, removeFromCart} = useCart();
    return(
        <Group>
            <Image
            src={item.product.image}
            alt= {item.product.title}
            width={80}/>
            <Text fw={600}>{item.product.title}</Text>
            <Text size="sm" c="dimmed">
                {formatPrice(item.product.price)}
            </Text>
            <NumberInput
            value={item.quantity}
            onChange={(value) => updateQuantity(item.product.id, Number (value) || 1)}
            min={1}
            max={99}
            style={{width: 80}}
            />
            <Text fw={500}>
                {formatPrice(item.product.price * item.quantity)}
            </Text>
            <Button color="red" size="xs" onClick={() => removeFromCart(item.product.id)}>
                Ta bort
            </Button>
        </Group>
    )

}