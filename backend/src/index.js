import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Endpoints
import routerProducts from "./routes/routerProducts.js";
import routerCategories from "./routes/routerCategories.js";
import routerUsers from "./routes/routerUsers.js";
import routerCart from "./routes/routerCart.js";
import routerOrders from "./routes/routerOrders.js";

app.use(routerProducts);
app.use(routerCategories);
app.use(routerUsers);
app.use(routerCart);
app.use(routerOrders)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
