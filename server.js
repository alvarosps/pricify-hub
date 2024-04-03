const express = require("express");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  }),
);
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
