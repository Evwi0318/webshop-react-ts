import {
  Alert, Badge, Button, Grid, Group, Image, Loader, NumberInput, Stack, Text, Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "@shared/types";
import { useCart } from "../hooks/useCart";
import { getProduct, formatPrice } from "../lib/api";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    getProduct(Number(id))
      .then(setProduct)
      .catch(() => setError("Produkten hittades inte."));
  }, [id]);

  if (error) {
    return (
      <Stack gap="md">
        <Alert color="red">{error}</Alert>
        <Button component={Link} to="/">Till startsidan</Button>
      </Stack>
    );
  }

  if (!product) return <Loader />;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Image src={product.image} alt={product.title} radius="md" />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap="sm">
          <Badge variant="light" w="fit-content">{product.category}</Badge>
          <Title order={1}>{product.title}</Title>
          <Text c="dimmed">{product.description}</Text>
          <Text fw={700} size="xl">{formatPrice(product.price)}</Text>
          <Text size="sm" c={product.stock > 0 ? "dimmed" : "red"}>
            {product.stock > 0 ? `${product.stock} i lager` : "Slut i lager"}
          </Text>

          <Group>
            <NumberInput
              value={quantity}
              onChange={(v) => setQuantity(Number(v) || 1)}
              min={1}
              max={Math.max(product.stock, 1)}
              w={90}
              disabled={product.stock === 0}
            />
            <Button
              disabled={product.stock === 0}
              onClick={() => addToCart(product, quantity)}
            >
              Lägg i kundvagn
            </Button>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}