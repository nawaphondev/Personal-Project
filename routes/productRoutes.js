// product.routes.js

const express = require("express");
const router = express.Router();
const productService = require("../services/product.service"); // Adjust the path based on your project structure

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

// Get a product by ID
router.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await productService.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
});

// Update a product by ID
router.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const updatedProduct = await productService.updateProductById(
      productId,
      req.body
    );

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product by ID
router.delete("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const deletedProduct = await productService.deleteProductById(productId);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
