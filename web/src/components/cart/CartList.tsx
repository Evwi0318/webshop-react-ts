import {Text} from "@mantine/core";
import { useCart } from "../../hooks/useCart";
import type {CartItem} from "@shared/types";
import { CartRow } from "./CartRow";

export function CartList() {
    const {items} = useCart();
    if (items.length === 0) {
        return <Text>Din kundvagn är tom!</Text>
    };
    return items.map((item: CartItem) => {
        return <CartRow item={item}/>;
    })
}