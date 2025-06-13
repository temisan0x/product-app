const Product = require("../db/models/product");
const User = require("../db/models/user");
const AppError = require("../utils/error");
const { productSchema } = require("../validators/productValidator");


async function createProduct(req, res, next) {
  try {

    const { error } = productSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: newProduct,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}
async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}

async function getProductsByUserId(req, res, next) {
  try {

    const products = await Product.findAll({
      where: {
        createdBy: req.user.id,
        deletedAt: null
      }
    });

    if (!products || products.length === 0) {
      return next(new AppError('No products found for this user', 404));
    }

    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}

async function updateProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (product.createdBy !== req.user.id) {
      return next(new AppError('You are not authorized to update this product', 401));
    }

    const updatedProduct = await product.update(req.body);
    res.status(200).json({
      status: 'success',
      data: updatedProduct,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}

async function deleteProduct(req, res, next) {
  console.log("Testing endpoint - Product ID:", req.params.id);
  console.log("User ID:", req.user.id);

  try {
    const productId = req.params.id; const product = await Product.findOne({
      where: {
        id: productId,
        createdBy: req.user.id
      }
    });

    console.log("Found product:", product ? "Yes" : "No");

    if (!product) {
      console.log("Product not found or user not authorized");
      return next(new AppError('Product not found or you are not authorized to delete this product', 404));
    }

    await product.destroy();

    console.log("Product soft deleted successfully");

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error("Delete error:", err);
    next(new AppError(err.message, 500));
  }
}

module.exports = { createProduct, getAllProducts, getProductById, getProductsByUserId, updateProduct, deleteProduct }