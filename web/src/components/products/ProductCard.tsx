import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Product } from "@shared/types";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/api";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Card withBorder radius="md" padding="md">
      <Card.Section>
        <Link to={`/product/${product.id}`}>
          <Image src={product.image} alt={product.title} h={220} fit="cover" />
        </Link>
      </Card.Section>

      <Group justify="space-between" mt="md" mb={4}>
        <Text
          component={Link}
          to={`/product/${product.id}`}
          fw={500}
          c="inherit"
          style={{ textDecoration: "none" }}
        >
          {product.title}
        </Text>
        <Badge variant="light">{product.category}</Badge>
      </Group>

      <Text fw={700} size="lg">{formatPrice(product.price)}</Text>

      <Button
        mt="md"
        fullWidth
        disabled={product.stock === 0}
        onClick={() => addToCart(product)}
      >
        {product.stock === 0 ? "Slut i lager" : "Lägg i kundvagn"}
      </Button>
    </Card>
  );
}