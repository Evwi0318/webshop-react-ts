import { Box, Container, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return (
    <Flex direction="column" mih="100vh">
      <Header />
      <Box component="main" style={{ flex: 1 }}>
        <Container size="lg" py="xl">
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}
