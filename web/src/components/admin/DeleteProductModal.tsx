import { Alert, Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import type { Product } from "@shared/types";
import { deleteProduct } from "../../lib/api";

interface Props {
  product: Product | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteProductModal({ product, onClose, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setError(null);
    onClose();
  }

  async function confirm() {
    if (!product) return;

    setDeleting(true);
    setError(null);
    try {
      await deleteProduct(product.id);
      onDeleted();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Modal opened={product !== null} onClose={close} title="Ta bort produkt" centered>
      <Text>
        Ta bort <strong>{product?.title}</strong>? Detta går inte att ångra.
      </Text>

      {error && (
        <Alert color="red" mt="md">
          {error}
        </Alert>
      )}

      <Group justify="flex-end" mt="lg">
        <Button variant="default" onClick={close} disabled={deleting}>
          Avbryt
        </Button>
        <Button color="red" onClick={confirm} loading={deleting}>
          Ta bort
        </Button>
      </Group>
    </Modal>
  );
}
