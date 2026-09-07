import { Button, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Stack align="center" py="xl" gap="md">
      <Title order={1}>404</Title>
      <Text c="dimmed">Sidan du letar efter finns inte.</Text>
      <Button component={Link} to="/">
        Till startsidan
      </Button>
    </Stack>
  );
}
