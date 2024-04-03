const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

// Route to create a new product
router.post("/", productController.createProduct);

// Route to update an existing product
router.put("/:id", productController.updateProduct);

// Route to list all published products
router.get("/", productController.listPublishedProducts);

// Route to get a single product by ID
router.get("/:id", productController.getProductById);

// Route to publish one or more products
router.post("/publish", productController.publishProducts);

module.exports = router;
