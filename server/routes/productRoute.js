const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const { createProduct, getAllProducts, getProductById, getProductsByUserId, updateProduct, deleteProduct} = require("../controllers/productController");

const router = express.Router()

router.use((req, res, next) => {
console.log(`Product Router - ${req.method} ${req.path}`);
console.log('Full URL:', req.originalUrl);
next();
});

router.post("/create", authenticate, createProduct);
router.get("/", getAllProducts);
router.get("/:id", authenticate, getProductById);
router.get("/users/products", authenticate, getProductsByUserId);
router.put('/:id', authenticate, updateProduct);
router.delete('/user/product/:id', authenticate, deleteProduct);

console.log('Product routes registered:');
console.log('- POST /create');
console.log('- GET /');
console.log('- GET /:id');
console.log('- GET /users/products');
console.log('- PUT /:id');
console.log('- DELETE /user/product/:id');

module.exports = router;