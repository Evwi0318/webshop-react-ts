import { Anchor, Box, Button, Container, Group, Indicator, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const { totalItems } = useCart();

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--mantine-color-body)",
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <Container size="lg" h={64}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Anchor component={Link} to="/" underline="never" c="inherit">
            <Text fw={700} size="lg">
              Soul Shoez
            </Text>
          </Anchor>

          <Group gap="xs" wrap="nowrap">
            <Button component={Link} to="/admin" variant="subtle" size="sm">
              Admin
            </Button>

            <Indicator label={totalItems} size={20} offset={4} disabled={totalItems === 0}>
              <Button component={Link} to="/checkout" variant="light" size="sm">
                Kundvagn
              </Button>
            </Indicator>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
