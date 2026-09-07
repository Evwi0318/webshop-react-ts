import cors from "cors";
import express from "express";
import { ordersRouter } from "./routes/orders.ts";
import { productsRouter } from "./routes/products.ts";

const app = express();
const PORT = Number(process.env["PORT"] ?? 3000);

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Endpointen finns inte." });
});

app.use(
  (
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    res.status(500).json({ error: "Något gick fel på servern." });
  },
);

app.listen(PORT, () => {
  console.log(`API igång på http://localhost:${PORT}`);
});
