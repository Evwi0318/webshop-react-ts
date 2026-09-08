import { Button, Group, Image, Table, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Product } from "@shared/types";
import { formatPrice } from "../../lib/api";

interface Props {
  products: Product[];
  onDelete: (product: Product) => void;
}

const COLUMNS = ["Bild", "Titel", "Kategori", "Pris", "Lager", ""];

export function ProductTable({ products, onDelete }: Props) {
  if (products.length === 0) {
    return <Text c="dimmed">Inga produkter än. Klicka på "Ny produkt" för att lägga till en.</Text>;
  }

  return (
    <Table.ScrollContainer minWidth={700}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {COLUMNS.map((column) => (
              <Table.Th key={column}>{column}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {products.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <Image src={product.image} alt={product.title} w={48} h={48} radius="sm" />
              </Table.Td>
              <Table.Td>{product.title}</Table.Td>
              <Table.Td>{product.category}</Table.Td>
              <Table.Td>{formatPrice(product.price)}</Table.Td>
              <Table.Td>{product.stock}</Table.Td>
              <Table.Td>
                <Group gap="xs" justify="flex-end" wrap="nowrap">
                  <Button
                    component={Link}
                    to={`/admin/${product.id}/edit`}
                    size="xs"
                    variant="default"
                  >
                    Ändra
                  </Button>
                  <Button size="xs" color="red" variant="light" onClick={() => onDelete(product)}>
                    Ta bort
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
