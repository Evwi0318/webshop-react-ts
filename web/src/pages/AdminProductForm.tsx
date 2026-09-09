import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NewProduct } from "@shared/types";
import { createProduct, getProduct, updateProduct } from "../lib/api";

const between = (min: number, max: number, label: string) => (value: string) =>
  value.trim().length >= min && value.trim().length <= max
    ? null
    : `${label} måste vara ${min}-${max} tecken.`;

const required = (label: string) => (value: string) =>
  value.trim() ? null : `${label} får inte vara tom.`;

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id !== undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<NewProduct>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      stock: 0,
    },
    validate: {
      title: between(2, 100, "Titel"),
      description: between(10, 2000, "Beskrivning"),
      image: required("Bild-URL"),
      category: required("Kategori"),
      price: (value) =>
        Number.isFinite(value) && value >= 0
          ? null
          : "Pris måste vara 0 eller större.",
      stock: (value) =>
        Number.isInteger(value) && value >= 0
          ? null
          : "Lagersaldo måste vara ett heltal, 0 eller större.",
    },
  });

  useEffect(() => {
    if (!id) return;

    getProduct(Number(id))
      .then(({ title, description, price, image, category, stock }) =>
        form.setValues({ title, description, price, image, category, stock }),
      )
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function submit(values: NewProduct) {
    setSaving(true);
    setError(null);
    try {
      if (id) await updateProduct(Number(id), values);
      else await createProduct(values);
      navigate("/admin");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap="lg" pos="relative">
      <LoadingOverlay visible={loading} />

      <Title order={1}>{id ? "Ändra produkt" : "Ny produkt"}</Title>

      {error && (
        <Alert color="red" title="Något gick fel">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(submit)}>
        <Stack gap="md">
          <TextInput
            label="Titel"
            withAsterisk
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Beskrivning"
            withAsterisk
            autosize
            minRows={4}
            {...form.getInputProps("description")}
          />

          <TextInput
            label="Bild-URL"
            withAsterisk
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Kategori"
            withAsterisk
            {...form.getInputProps("category")}
          />

          <Group grow>
            <NumberInput
              label="Pris (kr)"
              withAsterisk
              min={0}
              {...form.getInputProps("price")}
            />
            <NumberInput
              label="Lagersaldo"
              withAsterisk
              min={0}
              allowDecimal={false}
              {...form.getInputProps("stock")}
            />
          </Group>

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => navigate("/admin")}
              disabled={saving}
            >
              Avbryt
            </Button>
            <Button type="submit" loading={saving}>
              {id ? "Spara ändringar" : "Skapa produkt"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
