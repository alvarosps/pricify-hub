const productService = require("../services/productService");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await productService.createProduct(name, price);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;
    const product = await productService.updateProduct(id, name, price);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listPublishedProducts = async (req, res) => {
  try {
    const products = await productService.listPublishedProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const publishProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await productService.publishProducts(productIds);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  listPublishedProducts,
  publishProducts,
};
