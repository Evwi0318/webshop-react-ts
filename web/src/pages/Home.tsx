import { Alert, Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import type { Product } from "@shared/types";
import { ProductCard } from "../components/products/ProductCard";
import { getProducts } from "../lib/api";

export function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Kunde inte hämta produkterna."));
  }, []);

  if (error) return <Alert color="red">{error}</Alert>;
  if (!products) return <Loader />;

  return (
    <Stack gap="lg">
      <Title order={1}>Soul Shoez</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}