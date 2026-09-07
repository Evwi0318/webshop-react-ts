import { Box, Container, Group, Text } from "@mantine/core";

export function Footer() {
  return (
    <Box
      component="footer"
      py="lg"
      style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Container size="lg">
        <Group justify="space-between" gap="xs">
          <Text size="sm" c="dimmed">
            Soul Shoez – skor för vardag och fest
          </Text>
          <Text size="sm" c="dimmed">
            Skolprojekt {new Date().getFullYear()}
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
