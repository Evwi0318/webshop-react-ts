import { Alert, Button, Center, Group, Loader, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@shared/types";
import { DeleteProductModal } from "../components/admin/DeleteProductModal";
import { ProductTable } from "../components/admin/ProductTable";
import { getProducts } from "../lib/api";

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  function load() {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Adminpanel</Title>
        <Button component={Link} to="/admin/new">
          Ny produkt
        </Button>
      </Group>

      {loading && (
        <Center py="xl">
          <Loader />
        </Center>
      )}

      {error && (
        <Alert color="red" title="Kunde inte hämta produkterna">
          {error}
        </Alert>
      )}

      {!loading && !error && <ProductTable products={products} onDelete={setToDelete} />}

      <DeleteProductModal
        product={toDelete}
        onClose={() => setToDelete(null)}
        onDeleted={() => {
          setToDelete(null);
          load();
        }}
      />
    </Stack>
  );
}
